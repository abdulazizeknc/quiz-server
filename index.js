const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { getRandomQuestions } = require('./questions');
const {
    calculateScore,
    initializeGameState,
    determineWinner,
    selectMiniGame
} = require('./gameLogic');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Oda bazlı oyun sistemi
const rooms = {};

// Rastgele 6 haneli oda kodu oluştur
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Odayı oluştur
function createRoom(roomCode) {
    rooms[roomCode] = {
        players: [],
        gameState: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: {},
        miniGameResults: {}
    };
    return rooms[roomCode];
}

// Ana endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Quiz Game Server Running',
        activeRooms: Object.keys(rooms).length,
        status: 'online'
    });
});

io.on('connection', (socket) => {
    console.log('Yeni oyuncu bağlandı:', socket.id);
    let currentRoom = null;

    // Oda oluştur
    socket.on('create-room', (playerName) => {
        const roomCode = generateRoomCode();
        const room = createRoom(roomCode);

        const player = {
            id: socket.id,
            name: playerName || 'Oyuncu 1',
            score: 0,
            ready: false
        };

        room.players.push(player);
        socket.join(roomCode);
        currentRoom = roomCode;

        socket.emit('room-created', { roomCode });
        io.to(roomCode).emit('lobby-update', {
            roomCode,
            players: room.players,
            waitingForPlayers: room.players.length < 2
        });

        console.log(`Oda oluşturuldu: ${roomCode} - ${playerName}`);
    });

    // Odaya katıl
    socket.on('join-room', ({ roomCode, playerName }) => {
        const room = rooms[roomCode.toUpperCase()];

        if (!room) {
            socket.emit('room-error', { message: 'Oda bulunamadı!' });
            return;
        }

        if (room.players.length >= 2) {
            socket.emit('room-error', { message: 'Oda dolu!' });
            return;
        }

        const player = {
            id: socket.id,
            name: playerName || 'Oyuncu 2',
            score: 0,
            ready: false
        };

        room.players.push(player);
        socket.join(roomCode.toUpperCase());
        currentRoom = roomCode.toUpperCase();

        socket.emit('room-joined', { roomCode: currentRoom });
        io.to(currentRoom).emit('lobby-update', {
            roomCode: currentRoom,
            players: room.players,
            waitingForPlayers: room.players.length < 2
        });

        console.log(`${playerName} odaya katıldı: ${currentRoom}`);
    });

    // Oyuncu hazır
    socket.on('player-ready', () => {
        if (!currentRoom || !rooms[currentRoom]) return;

        const room = rooms[currentRoom];
        const player = room.players.find(p => p.id === socket.id);

        if (player) {
            player.ready = true;
            io.to(currentRoom).emit('lobby-update', {
                roomCode: currentRoom,
                players: room.players,
                waitingForPlayers: room.players.length < 2
            });

            // Her iki oyuncu da hazırsa oyunu başlat
            if (room.players.length === 2 && room.players.every(p => p.ready)) {
                startGame(currentRoom);
            }
        }
    });

    // Cevap gönder
    socket.on('submit-answer', ({ questionId, answerIndex, timeLeft }) => {
        if (!currentRoom || !rooms[currentRoom]) return;

        const room = rooms[currentRoom];
        const player = room.players.find(p => p.id === socket.id);
        if (!player || !room.gameState) return;

        const currentQuestion = room.questions[room.currentQuestionIndex];
        if (!currentQuestion || currentQuestion.id !== questionId) return;

        if (!room.answers[questionId]) {
            room.answers[questionId] = {};
        }

        const isCorrect = answerIndex === currentQuestion.correctAnswer;
        const score = calculateScore(isCorrect, timeLeft, currentQuestion.points);

        room.answers[questionId][socket.id] = {
            answerIndex,
            isCorrect,
            score,
            timeLeft
        };

        player.score += score;

        socket.emit('answer-result', {
            isCorrect,
            score,
            correctAnswer: currentQuestion.correctAnswer
        });

        if (Object.keys(room.answers[questionId]).length === 2) {
            setTimeout(() => {
                nextQuestion(currentRoom);
            }, 2000);
        }
    });

    // Mini oyun skoru gönder
    socket.on('submit-minigame-score', ({ gameType, score }) => {
        if (!currentRoom || !rooms[currentRoom]) return;

        const room = rooms[currentRoom];
        const player = room.players.find(p => p.id === socket.id);
        if (!player || !room.gameState) return;

        player.score += score;
        room.miniGameResults[socket.id] = score;

        io.to(currentRoom).emit('score-update', {
            players: room.players.map(p => ({ name: p.name, score: p.score }))
        });

        if (Object.keys(room.miniGameResults).length === 2) {
            setTimeout(() => {
                nextRoundOrEnd(currentRoom);
            }, 2000);
        }
    });

    // Bağlantı koptuğunda
    socket.on('disconnect', () => {
        console.log('Oyuncu ayrıldı:', socket.id);

        if (currentRoom && rooms[currentRoom]) {
            const room = rooms[currentRoom];
            room.players = room.players.filter(p => p.id !== socket.id);

            if (room.gameState && room.players.length < 2) {
                io.to(currentRoom).emit('game-cancelled', { reason: 'Oyuncu ayrıldı' });
                delete rooms[currentRoom];
            } else if (room.players.length === 0) {
                delete rooms[currentRoom];
            } else {
                io.to(currentRoom).emit('lobby-update', {
                    roomCode: currentRoom,
                    players: room.players,
                    waitingForPlayers: room.players.length < 2
                });
            }
        }
    });
});

// Oyunu başlat
function startGame(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    console.log(`Oyun başlıyor: ${roomCode}`);

    room.questions = getRandomQuestions(9);
    room.currentQuestionIndex = 0;
    room.answers = {};
    room.gameState = initializeGameState();
    room.gameState.round = 1;
    room.gameState.gamePhase = 'quiz';

    io.to(roomCode).emit('game-start', {
        totalRounds: 5,
        players: room.players.map(p => ({ name: p.name, score: p.score }))
    });

    setTimeout(() => {
        sendQuestion(roomCode);
    }, 2000);
}

// Soru gönder
function sendQuestion(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    const question = room.questions[room.currentQuestionIndex];
    if (!question) return;

    console.log(`Soru gönderiliyor [${roomCode}]: ${question.text}`);

    io.to(roomCode).emit('new-question', {
        questionId: question.id,
        text: question.text,
        options: question.options,
        timeLimit: 15,
        questionNumber: room.currentQuestionIndex + 1,
        totalQuestions: room.questions.length
    });
}

// Sıradaki soru
function nextQuestion(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    room.currentQuestionIndex++;

    if (room.currentQuestionIndex % 3 === 0 && room.currentQuestionIndex <= 9) {
        if (room.gameState.round === 3 || room.gameState.round === 5) {
            startMiniGame(roomCode);
            return;
        }
    }

    if (room.currentQuestionIndex < room.questions.length) {
        sendQuestion(roomCode);
    } else {
        if (room.gameState.round < 3) {
            room.gameState.round++;
            setTimeout(() => {
                sendQuestion(roomCode);
            }, 3000);
        } else {
            startMiniGame(roomCode);
        }
    }
}

// Mini oyun başlat
function startMiniGame(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    room.gameState.round++;
    const gameType = selectMiniGame(room.gameState.round);
    room.miniGameResults = {};

    console.log(`Mini oyun başlıyor [${roomCode}]: ${gameType}`);

    io.to(roomCode).emit('minigame-start', {
        gameType,
        round: room.gameState.round
    });
}

// Sıradaki tur veya oyun sonu
function nextRoundOrEnd(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    if (room.gameState.round >= 5) {
        endGame(roomCode);
    } else {
        setTimeout(() => {
            if (room.currentQuestionIndex < room.questions.length) {
                sendQuestion(roomCode);
            } else {
                startMiniGame(roomCode);
            }
        }, 3000);
    }
}

// Oyunu bitir
function endGame(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    console.log(`Oyun bitiyor: ${roomCode}`);

    const [player1, player2] = room.players;
    const result = determineWinner(player1.score, player2.score);

    io.to(roomCode).emit('game-end', {
        winner: result.winner,
        finalScores: room.players.map(p => ({
            name: p.name,
            score: p.score
        })),
        stats: {
            totalQuestions: room.questions.length,
            player1Correct: Object.values(room.answers).filter(a => a[player1.id]?.isCorrect).length,
            player2Correct: Object.values(room.answers).filter(a => a[player2.id]?.isCorrect).length
        }
    });

    // 10 saniye sonra odayı sil
    setTimeout(() => {
        delete rooms[roomCode];
        console.log(`Oda silindi: ${roomCode}`);
    }, 10000);
}

server.listen(PORT, () => {
    console.log(`🎮 Quiz Game Server çalışıyor: http://localhost:${PORT}`);
    console.log('Oda kodu sistemi aktif - Oyuncular bekleniyor...');
});
