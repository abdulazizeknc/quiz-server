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
const MAX_PLAYERS = 10;

// Oda bazlı oyun sistemi
const rooms = {};

// Rastgele 6 haneli oda kodu oluştur
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Odayı oluştur
function createRoom(roomCode, settings = {}) {
    rooms[roomCode] = {
        players: [],
        gameState: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: {},
        miniGameResults: {},
        snakeGameState: null,
        marioScores: {},
        settings: {
            duration: settings.duration || 'normal', // fast, normal, long
            questionCount: settings.duration === 'fast' ? 10 : settings.duration === 'long' ? 20 : 15,
            maxPlayers: MAX_PLAYERS
        }
    };
    return rooms[roomCode];
}

// Sıralama hesapla
function calculateRankings(players) {
    return [...players]
        .sort((a, b) => b.score - a.score)
        .map((player, index) => ({
            ...player,
            rank: index + 1,
            badge: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`
        }));
}

// Ana endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Quiz Game Server v2.0 Running',
        activeRooms: Object.keys(rooms).length,
        maxPlayers: MAX_PLAYERS,
        status: 'online'
    });
});

io.on('connection', (socket) => {
    console.log('Yeni oyuncu bağlandı:', socket.id);
    let currentRoom = null;

    // Oda oluştur
    socket.on('create-room', ({ playerName, settings }) => {
        const roomCode = generateRoomCode();
        const room = createRoom(roomCode, settings);

        const player = {
            id: socket.id,
            name: playerName || 'Oyuncu 1',
            score: 0,
            ready: false,
            isHost: true,
            eliminated: false
        };

        room.players.push(player);
        socket.join(roomCode);
        currentRoom = roomCode;

        socket.emit('room-created', { roomCode, isHost: true });
        io.to(roomCode).emit('lobby-update', {
            roomCode,
            players: room.players,
            settings: room.settings,
            waitingForPlayers: room.players.length < 2,
            canStart: room.players.length >= 2
        });

        console.log(`Oda oluşturuldu: ${roomCode} - ${playerName}`);
    });

    // Odaya katıl
    socket.on('join-room', ({ roomCode, playerName }) => {
        const code = roomCode.toUpperCase();
        const room = rooms[code];

        if (!room) {
            socket.emit('room-error', { message: 'Oda bulunamadı!' });
            return;
        }

        if (room.players.length >= MAX_PLAYERS) {
            socket.emit('room-error', { message: 'Oda dolu! (Max 10 oyuncu)' });
            return;
        }

        if (room.gameState) {
            socket.emit('room-error', { message: 'Oyun zaten başladı!' });
            return;
        }

        const player = {
            id: socket.id,
            name: playerName || `Oyuncu ${room.players.length + 1}`,
            score: 0,
            ready: false,
            isHost: false,
            eliminated: false
        };

        room.players.push(player);
        socket.join(code);
        currentRoom = code;

        socket.emit('room-joined', { roomCode: code, isHost: false });
        io.to(code).emit('lobby-update', {
            roomCode: code,
            players: room.players,
            settings: room.settings,
            waitingForPlayers: room.players.length < 2,
            canStart: room.players.length >= 2
        });

        console.log(`${playerName} odaya katıldı: ${code} (${room.players.length}/${MAX_PLAYERS})`);
    });

    // Oyun ayarlarını güncelle (host only)
    socket.on('update-settings', (settings) => {
        if (!currentRoom || !rooms[currentRoom]) return;
        const room = rooms[currentRoom];
        const player = room.players.find(p => p.id === socket.id);

        if (player && player.isHost) {
            room.settings = { ...room.settings, ...settings };
            io.to(currentRoom).emit('settings-updated', room.settings);
        }
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
                settings: room.settings,
                waitingForPlayers: room.players.length < 2,
                canStart: room.players.length >= 2 && room.players.every(p => p.ready)
            });

            // Tüm oyuncular hazırsa ve host başlatabilir
            if (room.players.length >= 2 && room.players.every(p => p.ready)) {
                startGame(currentRoom);
            }
        }
    });

    // Cevap gönder
    socket.on('submit-answer', ({ questionId, answerIndex, timeLeft }) => {
        if (!currentRoom || !rooms[currentRoom]) return;

        const room = rooms[currentRoom];
        const player = room.players.find(p => p.id === socket.id);
        if (!player || !room.gameState || player.eliminated) return;

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

        // Skor güncellemesi
        io.to(currentRoom).emit('score-update', {
            rankings: calculateRankings(room.players)
        });

        // Tüm aktif oyuncular cevapladıysa
        const activePlayers = room.players.filter(p => !p.eliminated);
        if (Object.keys(room.answers[questionId]).length >= activePlayers.length) {
            setTimeout(() => {
                nextQuestion(currentRoom);
            }, 2000);
        }
    });

    // Mini oyun skoru gönder
    socket.on('submit-minigame-score', ({ gameType, score, data }) => {
        if (!currentRoom || !rooms[currentRoom]) return;

        const room = rooms[currentRoom];
        const player = room.players.find(p => p.id === socket.id);
        if (!player || !room.gameState) return;

        if (gameType === 'mario') {
            room.marioScores[socket.id] = score;
            player.score += score;
        } else if (gameType === 'snake') {
            // Snake skorları ayrı işlenir
            if (data && data.eliminated) {
                player.eliminated = true;
            }
            if (!player.eliminated) {
                player.score += score;
            }
        } else {
            player.score += score;
            room.miniGameResults[socket.id] = score;
        }

        io.to(currentRoom).emit('score-update', {
            rankings: calculateRankings(room.players)
        });

        // Mario oyunu için tüm oyuncular bitirdiyse
        if (gameType === 'mario') {
            const activePlayers = room.players.filter(p => !p.eliminated);
            if (Object.keys(room.marioScores).length >= activePlayers.length) {
                setTimeout(() => {
                    room.marioScores = {};
                    nextRoundOrEnd(currentRoom);
                }, 3000);
            }
        }
    });

    // Snake oyunu hareket
    socket.on('snake-move', (direction) => {
        if (!currentRoom || !rooms[currentRoom]) return;
        const room = rooms[currentRoom];
        if (!room.snakeGameState) return;

        const snakeState = room.snakeGameState;
        if (snakeState.snakes[socket.id]) {
            snakeState.snakes[socket.id].direction = direction;
        }
    });

    // Bağlantı koptuğunda
    socket.on('disconnect', () => {
        console.log('Oyuncu ayrıldı:', socket.id);

        if (currentRoom && rooms[currentRoom]) {
            const room = rooms[currentRoom];
            const leavingPlayer = room.players.find(p => p.id === socket.id);
            room.players = room.players.filter(p => p.id !== socket.id);

            if (room.gameState && room.players.length < 2) {
                io.to(currentRoom).emit('game-cancelled', { reason: 'Yeterli oyuncu kalmadı' });
                delete rooms[currentRoom];
            } else if (room.players.length === 0) {
                delete rooms[currentRoom];
            } else {
                // Host ayrıldıysa yeni host ata
                if (leavingPlayer && leavingPlayer.isHost && room.players.length > 0) {
                    room.players[0].isHost = true;
                }
                io.to(currentRoom).emit('lobby-update', {
                    roomCode: currentRoom,
                    players: room.players,
                    settings: room.settings,
                    waitingForPlayers: room.players.length < 2,
                    canStart: room.players.length >= 2
                });
                io.to(currentRoom).emit('player-left', {
                    playerName: leavingPlayer?.name,
                    remainingPlayers: room.players.length
                });
            }
        }
    });
});

// Oyunu başlat
function startGame(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    console.log(`Oyun başlıyor: ${roomCode} (${room.players.length} oyuncu)`);

    room.questions = getRandomQuestions(room.settings.questionCount);
    room.currentQuestionIndex = 0;
    room.answers = {};
    room.gameState = initializeGameState();
    room.gameState.round = 1;
    room.gameState.totalRounds = 5; // 3 quiz + 2 mini oyun
    room.gameState.gamePhase = 'quiz';

    io.to(roomCode).emit('game-start', {
        totalRounds: room.gameState.totalRounds,
        questionCount: room.questions.length,
        settings: room.settings,
        players: room.players.map(p => ({ name: p.name, score: p.score }))
    });

    setTimeout(() => {
        sendQuestion(roomCode);
    }, 3000);
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
        category: question.category,
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

    // Mini oyun zamanı mı?
    const quizPerRound = Math.floor(room.questions.length / 3);
    if (room.currentQuestionIndex % quizPerRound === 0 && room.currentQuestionIndex < room.questions.length) {
        room.gameState.round++;
        if (room.gameState.round === 2) {
            startMarioGame(roomCode);
            return;
        } else if (room.gameState.round === 4) {
            startSnakeGame(roomCode);
            return;
        }
    }

    if (room.currentQuestionIndex < room.questions.length) {
        sendQuestion(roomCode);
    } else {
        endGame(roomCode);
    }
}

// Mario oyunu başlat
function startMarioGame(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    room.marioScores = {};
    console.log(`Mario oyunu başlıyor [${roomCode}]`);

    io.to(roomCode).emit('minigame-start', {
        gameType: 'mario',
        round: room.gameState.round,
        instructions: 'Engelleri atlayarak en uzağa git! Süre yok, düşene kadar devam et.'
    });
}

// Snake oyunu başlat
function startSnakeGame(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    // Her oyuncu için yılan oluştur
    const snakes = {};
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];

    room.players.forEach((player, index) => {
        snakes[player.id] = {
            id: player.id,
            name: player.name,
            color: colors[index % colors.length],
            body: [{ x: 50 + (index * 30), y: 50 + (index * 30) }],
            direction: 'right',
            alive: true,
            score: 0
        };
    });

    room.snakeGameState = {
        snakes,
        food: { x: 150, y: 150 },
        gameWidth: 400,
        gameHeight: 400
    };

    console.log(`Snake oyunu başlıyor [${roomCode}]`);

    io.to(roomCode).emit('minigame-start', {
        gameType: 'snake',
        round: room.gameState.round,
        snakeState: room.snakeGameState,
        instructions: 'Diğer yılanların kuyruğuna çarpmadan hayatta kal! Son kalan kazanır.'
    });

    // Snake oyunu döngüsü
    const gameLoop = setInterval(() => {
        if (!rooms[roomCode] || !room.snakeGameState) {
            clearInterval(gameLoop);
            return;
        }

        updateSnakeGame(roomCode);

        const aliveSnakes = Object.values(room.snakeGameState.snakes).filter(s => s.alive);

        io.to(roomCode).emit('snake-update', room.snakeGameState);

        // Bir veya sıfır yılan kaldıysa oyunu bitir
        if (aliveSnakes.length <= 1) {
            clearInterval(gameLoop);

            // Kazanana bonus puan
            if (aliveSnakes.length === 1) {
                const winner = room.players.find(p => p.id === aliveSnakes[0].id);
                if (winner) winner.score += 50;
            }

            setTimeout(() => {
                room.snakeGameState = null;
                io.to(roomCode).emit('minigame-end', {
                    gameType: 'snake',
                    rankings: calculateRankings(room.players)
                });

                setTimeout(() => {
                    nextRoundOrEnd(roomCode);
                }, 3000);
            }, 2000);
        }
    }, 100);

    // 60 saniye sonra zorla bitir
    setTimeout(() => {
        clearInterval(gameLoop);
        if (room.snakeGameState) {
            room.snakeGameState = null;
            io.to(roomCode).emit('minigame-end', {
                gameType: 'snake',
                rankings: calculateRankings(room.players)
            });
            nextRoundOrEnd(roomCode);
        }
    }, 60000);
}

// Snake oyunu güncelle
function updateSnakeGame(roomCode) {
    const room = rooms[roomCode];
    if (!room || !room.snakeGameState) return;

    const state = room.snakeGameState;

    Object.values(state.snakes).forEach(snake => {
        if (!snake.alive) return;

        const head = { ...snake.body[0] };

        switch (snake.direction) {
            case 'up': head.y -= 10; break;
            case 'down': head.y += 10; break;
            case 'left': head.x -= 10; break;
            case 'right': head.x += 10; break;
        }

        // Duvar kontrolü
        if (head.x < 0 || head.x >= state.gameWidth || head.y < 0 || head.y >= state.gameHeight) {
            snake.alive = false;
            return;
        }

        // Diğer yılanlarla çarpışma
        Object.values(state.snakes).forEach(otherSnake => {
            if (otherSnake.id === snake.id) return;
            otherSnake.body.forEach(segment => {
                if (head.x === segment.x && head.y === segment.y) {
                    snake.alive = false;
                }
            });
        });

        // Kendi kuyruğuyla çarpışma
        snake.body.slice(1).forEach(segment => {
            if (head.x === segment.x && head.y === segment.y) {
                snake.alive = false;
            }
        });

        if (!snake.alive) return;

        snake.body.unshift(head);

        // Yem yeme
        if (head.x === state.food.x && head.y === state.food.y) {
            snake.score += 10;
            state.food = {
                x: Math.floor(Math.random() * (state.gameWidth / 10)) * 10,
                y: Math.floor(Math.random() * (state.gameHeight / 10)) * 10
            };
        } else {
            snake.body.pop();
        }
    });
}

// Sıradaki tur veya oyun sonu
function nextRoundOrEnd(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    room.gameState.round++;

    if (room.currentQuestionIndex >= room.questions.length) {
        endGame(roomCode);
    } else {
        setTimeout(() => {
            sendQuestion(roomCode);
        }, 2000);
    }
}

// Oyunu bitir
function endGame(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    console.log(`Oyun bitiyor: ${roomCode}`);

    const rankings = calculateRankings(room.players);

    io.to(roomCode).emit('game-end', {
        rankings,
        stats: {
            totalQuestions: room.questions.length,
            playerStats: room.players.map(p => ({
                name: p.name,
                score: p.score,
                correctAnswers: Object.values(room.answers).filter(a => a[p.id]?.isCorrect).length
            }))
        }
    });

    // 30 saniye sonra odayı sil
    setTimeout(() => {
        delete rooms[roomCode];
        console.log(`Oda silindi: ${roomCode}`);
    }, 30000);
}

server.listen(PORT, () => {
    console.log(`🎮 Quiz Game Server v2.0 çalışıyor: http://localhost:${PORT}`);
    console.log(`👥 Maksimum oyuncu: ${MAX_PLAYERS}`);
    console.log('🐍 Multiplayer Snake aktif');
    console.log('🍄 Mario Platform oyunu aktif');
});
