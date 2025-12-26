// Soru Bankası
const questions = {
  logic: [
    {
      id: 1,
      text: "Bir sayı dizisi: 2, 4, 8, 16, ... Sıradaki sayı nedir?",
      options: ["24", "32", "20", "28"],
      correctAnswer: 1,
      points: 10,
      category: "logic"
    },
    {
      id: 2,
      text: "Ali'nin yaşı Ayşe'nin yaşının 2 katıdır. 5 yıl sonra yaşları toplamı 45 olacak. Ali şimdi kaç yaşında?",
      options: ["20", "25", "30", "15"],
      correctAnswer: 0,
      points: 10,
      category: "logic"
    },
    {
      id: 3,
      text: "A < B, B < C ise aşağıdakilerden hangisi kesinlikle doğrudur?",
      options: ["A > C", "A < C", "A = C", "B > C"],
      correctAnswer: 1,
      points: 10,
      category: "logic"
    },
    {
      id: 4,
      text: "Bir bavulda 5 kırmızı, 3 mavi ve 2 yeşil top var. Rastgele bir top çekiyorsunuz. Mavi top çekme olasılığı nedir?",
      options: ["1/5", "3/10", "1/3", "1/2"],
      correctAnswer: 1,
      points: 10,
      category: "logic"
    },
    {
      id: 5,
      text: "25 x 4 + 16 ÷ 2 = ?",
      options: ["108", "58", "208", "100"],
      correctAnswer: 0,
      points: 10,
      category: "logic"
    },
    {
      id: 6,
      text: "Bir dikdörtgenin alanı 72 cm². Uzun kenarı kısa kenarının 2 katıysa, kısa kenar kaç cm?",
      options: ["6", "8", "9", "12"],
      correctAnswer: 0,
      points: 10,
      category: "logic"
    },
    {
      id: 7,
      text: "Hangi sayı diğerlerinden farklıdır? 2, 3, 5, 7, 9, 11",
      options: ["2", "5", "9", "11"],
      correctAnswer: 2,
      points: 10,
      category: "logic"
    },
    {
      id: 8,
      text: "Bir sınıfta 30 öğrenci var. %40'ı kız ise, kaç erkek vardır?",
      options: ["12", "18", "15", "20"],
      correctAnswer: 1,
      points: 10,
      category: "logic"
    }
  ],
  
  culture: [
    {
      id: 9,
      text: "Türkiye'nin başkenti neresidir?",
      options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
      correctAnswer: 1,
      points: 10,
      category: "culture"
    },
    {
      id: 10,
      text: "Dünya'nın en büyük okyanusu hangisidir?",
      options: ["Atlas Okyanusu", "Hint Okyanusu", "Pasifik Okyanusu", "Arktik Okyanusu"],
      correctAnswer: 2,
      points: 10,
      category: "culture"
    },
    {
      id: 11,
      text: "Mona Lisa tablosunu kim yapmıştır?",
      options: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2,
      points: 10,
      category: "culture"
    },
    {
      id: 12,
      text: "Türkiye Cumhuriyeti hangi yıl kurulmuştur?",
      options: ["1920", "1921", "1922", "1923"],
      correctAnswer: 3,
      points: 10,
      category: "culture"
    },
    {
      id: 13,
      text: "Güneş sisteminde kaç gezegen vardır?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 1,
      points: 10,
      category: "culture"
    },
    {
      id: 14,
      text: "Cumhuriyet Bayramı hangi tarihte kutlanır?",
      options: ["23 Nisan", "19 Mayıs", "30 Ağustos", "29 Ekim"],
      correctAnswer: 3,
      points: 10,
      category: "culture"
    },
    {
      id: 15,
      text: "DNA'nın açılımı nedir?",
      options: ["Deoksiribonükleik Asit", "Dinamik Nöral Algoritma", "Doğal Nükleer Asit", "Dijital Nöron Ağı"],
      correctAnswer: 0,
      points: 10,
      category: "culture"
    },
    {
      id: 16,
      text: "İstanbul hangi iki kıtayı birbirine bağlar?",
      options: ["Asya-Afrika", "Avrupa-Asya", "Avrupa-Afrika", "Asya-Amerika"],
      correctAnswer: 1,
      points: 10,
      category: "culture"
    },
    {
      id: 17,
      text: "Bir yılda kaç gün vardır?",
      options: ["364", "365", "366", "360"],
      correctAnswer: 1,
      points: 10,
      category: "culture"
    },
    {
      id: 18,
      text: "Hangisi bir programlama dili değildir?",
      options: ["Python", "Java", "Photoshop", "JavaScript"],
      correctAnswer: 2,
      points: 10,
      category: "culture"
    }
  ],
  
  attention: [
    {
      id: 19,
      text: "Kelimeyi hızlıca okuyun: KIRMIZI. Kelimenin kaç harfi var?",
      options: ["6", "7", "8", "5"],
      correctAnswer: 1,
      points: 10,
      category: "attention"
    },
    {
      id: 20,
      text: "🔴🔵🔴🔴🔵🔴 - Kaç tane kırmızı daire var?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      points: 10,
      category: "attention"
    },
    {
      id: 21,
      text: "123456789 - Bu sayı dizisinde kaç tane '5' var?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      points: 10,
      category: "attention"
    },
    {
      id: 22,
      text: "AAABBBAAABBB - Bu dizide kaç grup A harfi var?",
      options: ["1", "2", "3", "6"],
      correctAnswer: 1,
      points: 10,
      category: "attention"
    },
    {
      id: 23,
      text: "Hangi kelime diğerlerinden farklı? KEDI, KÖPEK, MASA, KUŞŞ",
      options: ["KEDI", "KÖPEK", "MASA", "KUŞ"],
      correctAnswer: 2,
      points: 10,
      category: "attention"
    }
  ]
};

// Rastgele sorular seç
function getRandomQuestions(count = 9) {
  const allQuestions = [
    ...questions.logic,
    ...questions.culture,
    ...questions.attention
  ];
  
  // Fisher-Yates shuffle
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

module.exports = { questions, getRandomQuestions };
