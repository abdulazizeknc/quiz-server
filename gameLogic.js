// Oyun Mantığı Yardımcı Fonksiyonları

// Hız bonusu hesaplama (15 saniye içinde ne kadar hızlı cevaplandı)
function calculateSpeedBonus(timeLeft, maxTime = 15) {
    const percentage = timeLeft / maxTime;
    if (percentage > 0.8) return 5; // Çok hızlı
    if (percentage > 0.5) return 3; // Hızlı
    if (percentage > 0.2) return 1; // Normal
    return 0; // Yavaş
}

// Skor hesaplama
function calculateScore(isCorrect, timeLeft, basePoints = 10) {
    if (!isCorrect) return 0;
    const speedBonus = calculateSpeedBonus(timeLeft);
    return basePoints + speedBonus;
}

// Mini oyun skoru hesaplama
function calculateMiniGameScore(performance) {
    // performance: 0-100 arası bir değer
    // memory game için: eşleşme hızı ve doğruluk
    // reaction game için: tepki süresi
    // color sequence için: doğru sıralama sayısı
    return Math.round(performance / 2); // 0-50 puan arası
}

// Oyun durumu başlatma
function initializeGameState() {
    return {
        round: 0,
        maxRounds: 5,
        currentQuestion: null,
        currentMiniGame: null,
        players: {},
        roundStartTime: null,
        gamePhase: 'waiting' // waiting, quiz, minigame, results
    };
}

// Bir sonraki tura geç
function nextRound(gameState) {
    gameState.round++;

    // Round 1, 2, 3: Quiz
    // Round 4, 5: Mini games
    if (gameState.round <= 3) {
        gameState.gamePhase = 'quiz';
    } else if (gameState.round <= 5) {
        gameState.gamePhase = 'minigame';
    } else {
        gameState.gamePhase = 'results';
    }

    return gameState;
}

// Kazananı belirle
function determineWinner(player1Score, player2Score) {
    if (player1Score > player2Score) {
        return { winner: 'player1', player1Score, player2Score };
    } else if (player2Score > player1Score) {
        return { winner: 'player2', player1Score, player2Score };
    } else {
        return { winner: 'tie', player1Score, player2Score };
    }
}

// Mini oyun türünü seç
function selectMiniGame(roundNumber) {
    const miniGames = ['memory', 'reaction'];
    const index = (roundNumber - 4) % miniGames.length;
    return miniGames[index];
}

module.exports = {
    calculateSpeedBonus,
    calculateScore,
    calculateMiniGameScore,
    initializeGameState,
    nextRound,
    determineWinner,
    selectMiniGame
};
