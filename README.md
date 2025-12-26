# Quiz Game Server

Multiplayer quiz oyunu için Socket.io backend sunucusu.

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npm start
```

Server http://localhost:3000 adresinde çalışacaktır.

## Geliştirme Modu

```bash
npm run dev
```

## Özellikler

- ✅ Socket.io ile gerçek zamanlı iletişim
- ✅ 2 oyuncu eşleştirme
- ✅ Quiz soruları (mantık, genel kültür, dikkat)
- ✅ Mini oyunlar desteği
- ✅ Hız bonusu ve skor yönetimi
- ✅ Otomatik oyun akışı

## API Endpoints

- `GET /` - Server durumu

## Socket Events

### Client -> Server
- `join-lobby` - Lobby'e katıl
- `player-ready` - Hazır olduğunu bildir
- `submit-answer` - Cevap gönder
- `submit-minigame-score` - Mini oyun skoru gönder

### Server -> Client
- `lobby-update` - Lobby durumu güncellendi
- `game-start` - Oyun başladı
- `new-question` - Yeni soru
- `answer-result` - Cevap sonucu
- `score-update` - Skor güncellendi
- `minigame-start` - Mini oyun başladı
- `game-end` - Oyun bitti
- `game-cancelled` - Oyun iptal edildi
