// Lise Düzeyi Soru Bankası (100+ Soru)
const questions = {
  matematik: [
    {
      id: 1,
      text: "f(x) = 2x + 3 fonksiyonunda f(5) kaçtır?",
      options: ["10", "13", "8", "15"],
      correctAnswer: 1,
      points: 10,
      category: "matematik"
    },
    {
      id: 2,
      text: "x² - 9 = 0 denkleminin kökleri nelerdir?",
      options: ["3 ve -3", "9 ve -9", "3 ve 3", "0 ve 9"],
      correctAnswer: 0,
      points: 10,
      category: "matematik"
    },
    {
      id: 3,
      text: "log₁₀(100) kaçtır?",
      options: ["1", "2", "10", "100"],
      correctAnswer: 1,
      points: 10,
      category: "matematik"
    },
    {
      id: 4,
      text: "Bir üçgenin iç açıları toplamı kaç derecedir?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1,
      points: 10,
      category: "matematik"
    },
    {
      id: 5,
      text: "√144 kaçtır?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 1,
      points: 10,
      category: "matematik"
    },
    {
      id: 6,
      text: "2³ × 2² = ?",
      options: ["32", "16", "64", "8"],
      correctAnswer: 0,
      points: 10,
      category: "matematik"
    },
    {
      id: 7,
      text: "Bir dikdörtgenin köşegeni 10 cm, bir kenarı 6 cm ise diğer kenarı kaç cm'dir?",
      options: ["4", "8", "5", "7"],
      correctAnswer: 1,
      points: 10,
      category: "matematik"
    },
    {
      id: 8,
      text: "sin²θ + cos²θ = ?",
      options: ["0", "1", "2", "θ"],
      correctAnswer: 1,
      points: 10,
      category: "matematik"
    },
    {
      id: 9,
      text: "5! (5 faktöriyel) kaçtır?",
      options: ["25", "120", "60", "720"],
      correctAnswer: 1,
      points: 10,
      category: "matematik"
    },
    {
      id: 10,
      text: "Bir çemberin çevresi 2πr ise alanı nedir?",
      options: ["πr", "2πr²", "πr²", "4πr"],
      correctAnswer: 2,
      points: 10,
      category: "matematik"
    }
  ],

  fizik: [
    {
      id: 11,
      text: "Işık hızı yaklaşık kaç km/s'dir?",
      options: ["300.000", "150.000", "1.000.000", "30.000"],
      correctAnswer: 0,
      points: 10,
      category: "fizik"
    },
    {
      id: 12,
      text: "F = m × a formülü kimin yasasıdır?",
      options: ["Einstein", "Newton", "Galileo", "Tesla"],
      correctAnswer: 1,
      points: 10,
      category: "fizik"
    },
    {
      id: 13,
      text: "Yerçekimi ivmesi (g) yaklaşık kaç m/s²'dir?",
      options: ["5", "10", "15", "20"],
      correctAnswer: 1,
      points: 10,
      category: "fizik"
    },
    {
      id: 14,
      text: "Elektrik akımının birimi nedir?",
      options: ["Volt", "Watt", "Amper", "Ohm"],
      correctAnswer: 2,
      points: 10,
      category: "fizik"
    },
    {
      id: 15,
      text: "Ses hangi ortamda en hızlı yayılır?",
      options: ["Hava", "Su", "Katı", "Boşluk"],
      correctAnswer: 2,
      points: 10,
      category: "fizik"
    },
    {
      id: 16,
      text: "Kinetik enerji formülü nedir?",
      options: ["mgh", "½mv²", "Fd", "Pt"],
      correctAnswer: 1,
      points: 10,
      category: "fizik"
    },
    {
      id: 17,
      text: "Hangi renk ışık en yüksek enerjiye sahiptir?",
      options: ["Kırmızı", "Yeşil", "Mavi", "Mor"],
      correctAnswer: 3,
      points: 10,
      category: "fizik"
    },
    {
      id: 18,
      text: "Ohm Kanunu'na göre V = ?",
      options: ["I/R", "I×R", "R/I", "I+R"],
      correctAnswer: 1,
      points: 10,
      category: "fizik"
    },
    {
      id: 19,
      text: "Suyun kaynama noktası deniz seviyesinde kaç °C'dir?",
      options: ["90", "100", "110", "120"],
      correctAnswer: 1,
      points: 10,
      category: "fizik"
    },
    {
      id: 20,
      text: "Elektromanyetik dalgalar arasında hangisi en uzun dalga boyuna sahiptir?",
      options: ["Gama", "X-ışını", "Radyo", "Morötesi"],
      correctAnswer: 2,
      points: 10,
      category: "fizik"
    }
  ],

  kimya: [
    {
      id: 21,
      text: "Suyun kimyasal formülü nedir?",
      options: ["H₂O", "CO₂", "NaCl", "O₂"],
      correctAnswer: 0,
      points: 10,
      category: "kimya"
    },
    {
      id: 22,
      text: "Periyodik tabloda kaç element vardır?",
      options: ["108", "112", "118", "120"],
      correctAnswer: 2,
      points: 10,
      category: "kimya"
    },
    {
      id: 23,
      text: "Altının sembolü nedir?",
      options: ["Ag", "Au", "Al", "At"],
      correctAnswer: 1,
      points: 10,
      category: "kimya"
    },
    {
      id: 24,
      text: "pH değeri 7 olan çözelti nasıl bir ortamdır?",
      options: ["Asidik", "Bazik", "Nötr", "Tuzlu"],
      correctAnswer: 2,
      points: 10,
      category: "kimya"
    },
    {
      id: 25,
      text: "Atmosferdeki en fazla bulunan gaz hangisidir?",
      options: ["Oksijen", "Karbondioksit", "Azot", "Argon"],
      correctAnswer: 2,
      points: 10,
      category: "kimya"
    },
    {
      id: 26,
      text: "NaCl bileşiğinin adı nedir?",
      options: ["Karbonat", "Sülfat", "Sofra tuzu", "Kireç"],
      correctAnswer: 2,
      points: 10,
      category: "kimya"
    },
    {
      id: 27,
      text: "Hidrojen atomunun proton sayısı kaçtır?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      points: 10,
      category: "kimya"
    },
    {
      id: 28,
      text: "Fotosentez sonucu hangi gaz açığa çıkar?",
      options: ["CO₂", "N₂", "O₂", "H₂"],
      correctAnswer: 2,
      points: 10,
      category: "kimya"
    },
    {
      id: 29,
      text: "Asetik asit hangi ürünün ana bileşenidir?",
      options: ["Limon", "Sirke", "Süt", "Şeker"],
      correctAnswer: 1,
      points: 10,
      category: "kimya"
    },
    {
      id: 30,
      text: "Demir elementi hangi sembolle gösterilir?",
      options: ["De", "Fe", "Ir", "Dr"],
      correctAnswer: 1,
      points: 10,
      category: "kimya"
    }
  ],

  biyoloji: [
    {
      id: 31,
      text: "İnsan vücudunda kaç kemik vardır?",
      options: ["186", "206", "226", "266"],
      correctAnswer: 1,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 32,
      text: "DNA'nın açılımı nedir?",
      options: ["Deoksiribonükleik Asit", "Dinamik Nöral Asit", "Doğal Nükleer Asit", "Dijital Nöron Ağı"],
      correctAnswer: 0,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 33,
      text: "Hücrenin enerji santrali olarak bilinen organel hangisidir?",
      options: ["Ribozom", "Golgi", "Mitokondri", "Lizozom"],
      correctAnswer: 2,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 34,
      text: "İnsan kanında oksijen taşıyan protein nedir?",
      options: ["Miyoglobin", "Hemoglobin", "Albumin", "Keratin"],
      correctAnswer: 1,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 35,
      text: "Fotosentez hangi organelde gerçekleşir?",
      options: ["Mitokondri", "Ribozom", "Kloroplast", "Çekirdek"],
      correctAnswer: 2,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 36,
      text: "Kan grupları arasında evrensel verici hangisidir?",
      options: ["A Rh+", "B Rh-", "AB Rh+", "0 Rh-"],
      correctAnswer: 3,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 37,
      text: "İnsan vücudundaki en büyük organ hangisidir?",
      options: ["Karaciğer", "Beyin", "Deri", "Akciğer"],
      correctAnswer: 2,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 38,
      text: "Genetik bilgiyi taşıyan molekül hangisidir?",
      options: ["Protein", "Karbonhidrat", "DNA", "Yağ"],
      correctAnswer: 2,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 39,
      text: "İnsan kalbi kaç odacıklıdır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      points: 10,
      category: "biyoloji"
    },
    {
      id: 40,
      text: "Sindirim sisteminin en uzun bölümü hangisidir?",
      options: ["Mide", "Kalın bağırsak", "İnce bağırsak", "Yemek borusu"],
      correctAnswer: 2,
      points: 10,
      category: "biyoloji"
    }
  ],

  tarih: [
    {
      id: 41,
      text: "Türkiye Cumhuriyeti hangi yıl kuruldu?",
      options: ["1920", "1921", "1922", "1923"],
      correctAnswer: 3,
      points: 10,
      category: "tarih"
    },
    {
      id: 42,
      text: "İstanbul'un fethi hangi yılda gerçekleşti?",
      options: ["1453", "1463", "1443", "1473"],
      correctAnswer: 0,
      points: 10,
      category: "tarih"
    },
    {
      id: 43,
      text: "Kurtuluş Savaşı'nın başkomutanı kimdir?",
      options: ["İsmet İnönü", "Kazım Karabekir", "Mustafa Kemal Atatürk", "Fevzi Çakmak"],
      correctAnswer: 2,
      points: 10,
      category: "tarih"
    },
    {
      id: 44,
      text: "Osmanlı Devleti hangi yılda kuruldu?",
      options: ["1299", "1389", "1199", "1399"],
      correctAnswer: 0,
      points: 10,
      category: "tarih"
    },
    {
      id: 45,
      text: "Birinci Dünya Savaşı kaç yılında başladı?",
      options: ["1912", "1914", "1916", "1918"],
      correctAnswer: 1,
      points: 10,
      category: "tarih"
    },
    {
      id: 46,
      text: "Çanakkale Savaşı hangi yılda yapıldı?",
      options: ["1914", "1915", "1916", "1917"],
      correctAnswer: 1,
      points: 10,
      category: "tarih"
    },
    {
      id: 47,
      text: "Fatih Sultan Mehmet İstanbul'u fethettiğinde kaç yaşındaydı?",
      options: ["19", "21", "23", "25"],
      correctAnswer: 1,
      points: 10,
      category: "tarih"
    },
    {
      id: 48,
      text: "Osmanlı Devleti'nin son padişahı kimdir?",
      options: ["Abdülhamit II", "Mehmet V", "Vahdettin", "Abdülmecit II"],
      correctAnswer: 2,
      points: 10,
      category: "tarih"
    },
    {
      id: 49,
      text: "TBMM hangi tarihte açıldı?",
      options: ["29 Ekim 1923", "23 Nisan 1920", "19 Mayıs 1919", "30 Ağustos 1922"],
      correctAnswer: 1,
      points: 10,
      category: "tarih"
    },
    {
      id: 50,
      text: "Lozan Antlaşması hangi yılda imzalandı?",
      options: ["1921", "1922", "1923", "1924"],
      correctAnswer: 2,
      points: 10,
      category: "tarih"
    }
  ],

  edebiyat: [
    {
      id: 51,
      text: "'Safahat' kimin eseridir?",
      options: ["Yahya Kemal", "Mehmet Akif Ersoy", "Necip Fazıl", "Nazım Hikmet"],
      correctAnswer: 1,
      points: 10,
      category: "edebiyat"
    },
    {
      id: 52,
      text: "'Çalıkuşu' romanının yazarı kimdir?",
      options: ["Halide Edip Adıvar", "Reşat Nuri Güntekin", "Yakup Kadri", "Peyami Safa"],
      correctAnswer: 1,
      points: 10,
      category: "edebiyat"
    },
    {
      id: 53,
      text: "Divan edebiyatının en önemli şairi kabul edilen kişi kimdir?",
      options: ["Yunus Emre", "Fuzuli", "Baki", "Nedim"],
      correctAnswer: 1,
      points: 10,
      category: "edebiyat"
    },
    {
      id: 54,
      text: "'Kürk Mantolu Madonna' kimin eseridir?",
      options: ["Sabahattin Ali", "Orhan Kemal", "Yaşar Kemal", "Aziz Nesin"],
      correctAnswer: 0,
      points: 10,
      category: "edebiyat"
    },
    {
      id: 55,
      text: "'İnce Memed' romanının yazarı kimdir?",
      options: ["Orhan Pamuk", "Yaşar Kemal", "Orhan Kemal", "Kemal Tahir"],
      correctAnswer: 1,
      points: 10,
      category: "edebiyat"
    },
    {
      id: 56,
      text: "Nobel Edebiyat Ödülü alan ilk Türk yazar kimdir?",
      options: ["Yaşar Kemal", "Orhan Pamuk", "Nazım Hikmet", "Aziz Nesin"],
      correctAnswer: 1,
      points: 10,
      category: "edebiyat"
    },
    {
      id: 57,
      text: "'Nutuk' kimin eseridir?",
      options: ["İsmet İnönü", "Mustafa Kemal Atatürk", "Celal Bayar", "Ziya Gökalp"],
      correctAnswer: 1,
      points: 10,
      category: "edebiyat"
    },
    {
      id: 58,
      text: "Milli edebiyat döneminin en önemli şairlerinden biri kimdir?",
      options: ["Tevfik Fikret", "Ziya Gökalp", "Ahmet Haşim", "Yahya Kemal"],
      correctAnswer: 1,
      points: 10,
      category: "edebiyat"
    }
  ],

  cografya: [
    {
      id: 59,
      text: "Türkiye'nin en uzun nehri hangisidir?",
      options: ["Fırat", "Dicle", "Kızılırmak", "Sakarya"],
      correctAnswer: 2,
      points: 10,
      category: "cografya"
    },
    {
      id: 60,
      text: "Dünya'nın en büyük okyanusu hangisidir?",
      options: ["Atlas", "Hint", "Pasifik", "Arktik"],
      correctAnswer: 2,
      points: 10,
      category: "cografya"
    },
    {
      id: 61,
      text: "Türkiye'nin en yüksek dağı hangisidir?",
      options: ["Erciyes", "Süphan", "Ağrı", "Uludağ"],
      correctAnswer: 2,
      points: 10,
      category: "cografya"
    },
    {
      id: 62,
      text: "Dünya'nın en kalabalık ülkesi hangisidir?",
      options: ["Hindistan", "Çin", "ABD", "Endonezya"],
      correctAnswer: 0,
      points: 10,
      category: "cografya"
    },
    {
      id: 63,
      text: "Amazon Nehri hangi kıtadadır?",
      options: ["Afrika", "Asya", "Güney Amerika", "Kuzey Amerika"],
      correctAnswer: 2,
      points: 10,
      category: "cografya"
    },
    {
      id: 64,
      text: "Türkiye kaç coğrafi bölgeye ayrılır?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      points: 10,
      category: "cografya"
    },
    {
      id: 65,
      text: "Ekvator'un geçtiği kıta sayısı kaçtır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      points: 10,
      category: "cografya"
    },
    {
      id: 66,
      text: "Dünyanın en büyük gölü hangisidir?",
      options: ["Victoria", "Süperior", "Hazar", "Baykal"],
      correctAnswer: 2,
      points: 10,
      category: "cografya"
    },
    {
      id: 67,
      text: "Karadeniz'e kıyısı olan ülke sayısı kaçtır?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      points: 10,
      category: "cografya"
    },
    {
      id: 68,
      text: "Türkiye'nin yüzölçümü yaklaşık kaç km²'dir?",
      options: ["550.000", "680.000", "780.000", "850.000"],
      correctAnswer: 2,
      points: 10,
      category: "cografya"
    }
  ],

  genelKultur: [
    {
      id: 69,
      text: "Hangisi bir programlama dili değildir?",
      options: ["Python", "Java", "Photoshop", "JavaScript"],
      correctAnswer: 2,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 70,
      text: "FIFA Dünya Kupası kaç yılda bir yapılır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 71,
      text: "Mona Lisa tablosu hangi müzededir?",
      options: ["British Museum", "Louvre", "Uffizi", "Prado"],
      correctAnswer: 1,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 72,
      text: "Bitcoin'in yaratıcısı olarak bilinen takma isim nedir?",
      options: ["Vitalik Buterin", "Satoshi Nakamoto", "Elon Musk", "Nick Szabo"],
      correctAnswer: 1,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 73,
      text: "Olimpiyat oyunları kaç yılda bir yapılır?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 74,
      text: "Tesla otomobil şirketinin CEO'su kimdir?",
      options: ["Jeff Bezos", "Bill Gates", "Elon Musk", "Tim Cook"],
      correctAnswer: 2,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 75,
      text: "WhatsApp'ın sahibi hangi şirkettir?",
      options: ["Google", "Apple", "Meta", "Microsoft"],
      correctAnswer: 2,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 76,
      text: "Ay'a ilk ayak basan astronot kimdir?",
      options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"],
      correctAnswer: 1,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 77,
      text: "YouTube hangi yılda kuruldu?",
      options: ["2003", "2005", "2007", "2009"],
      correctAnswer: 1,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 78,
      text: "Dünyanın en çok konuşulan dili hangisidir?",
      options: ["İspanyolca", "İngilizce", "Mandarin Çincesi", "Hintçe"],
      correctAnswer: 2,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 79,
      text: "Instagram hangi yılda kuruldu?",
      options: ["2008", "2010", "2012", "2014"],
      correctAnswer: 1,
      points: 10,
      category: "genelKultur"
    },
    {
      id: 80,
      text: "Dünyada en çok altın rezervine sahip ülke hangisidir?",
      options: ["Çin", "Rusya", "ABD", "Almanya"],
      correctAnswer: 2,
      points: 10,
      category: "genelKultur"
    }
  ]
};

// Rastgele sorular seç
function getRandomQuestions(count = 15) {
  const allQuestions = [
    ...questions.matematik,
    ...questions.fizik,
    ...questions.kimya,
    ...questions.biyoloji,
    ...questions.tarih,
    ...questions.edebiyat,
    ...questions.cografya,
    ...questions.genelKultur
  ];

  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Kategoriye göre soru getir
function getQuestionsByCategory(category, count = 5) {
  const categoryQuestions = questions[category] || [];
  const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

module.exports = { questions, getRandomQuestions, getQuestionsByCategory };
