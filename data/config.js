/*
 * USTAWIENIA STRONY KOŁA NAUKOWEGO HYDROTECH
 * ------------------------------------------
 * Zmieniaj tylko wartości w cudzysłowach. Puste pole ("") = element się nie wyświetli.
 */
window.HYDROTECH_CONFIG = {
  nazwa: "HYDROTECH",
  pelnaNazwa: "Koło Naukowe Hydrotechników „Hydrotech”",
  uczelnia: "Politechnika Krakowska im. Tadeusza Kościuszki",
  wydzial: "Wydział Inżynierii Środowiska i Energetyki",
  adres: "ul. Warszawska 24, 31-155 Kraków",

  // UZUPEŁNIJ: dane kontaktowe koła
  email: "hydrotech.edu.pk@gmail.com",
  facebook: "",   // np. "https://www.facebook.com/twoja-strona"
  instagram: "",  // np. "https://www.instagram.com/twoj-profil"
  opiekun: "",    // np. "dr inż. Jan Kowalski"

  // Opis koła w sekcji „O kole” – każdy akapit w osobnym cudzysłowie.
  // Pierwszy akapit jest wyróżniony. Słowa „nasz profil” zamienią się w link,
  // gdy uzupełnisz powyżej pole instagram lub facebook.
  opis: [
    "Oto Koło Naukowe Hydrotechników „Hydrotech” ⚙️🌊🌉",
    "Działamy na WIŚiE Politechniki Krakowskiej i zrzeszamy studentów, których kręci budownictwo wodne oraz inżynieria środowiska – ale przede wszystkim tworzymy zgraną ekipę.",
    "U nas nauka idzie w parze z praktyką i integracją: analizujemy wielkie inwestycje hydrotechniczne, rozwijamy umiejętności techniczne, jeździmy na wyjazdy i poznajemy ludzi z różnych roczników w świetnej atmosferze. 🤝💙",
    "Obserwuj nasz profil, żeby być na bieżąco z tym, co u nas słychać! ✨🌊"
  ],

  // true = pokazuj informację, że na stronie są przykładowe treści. Zmień na false po dodaniu własnych reportaży.
  pokazInfoDemo: true
};

/*
 * RODZAJE OBIEKTÓW (filtry i kolory pinezek na mapie).
 * Kolory pochodzą z palety Politechniki Krakowskiej.
 */
window.HYDROTECH_TYPY = {
  zapora:      { nazwa: "Zapora",                kolor: "#02356f" },
  zbiornik:    { nazwa: "Zbiornik",              kolor: "#557dbc" },
  jaz:         { nazwa: "Jaz / stopień wodny",   kolor: "#006faa" },
  sluza:       { nazwa: "Śluza",                 kolor: "#009c92" },
  elektrownia: { nazwa: "Elektrownia wodna",     kolor: "#d98700" },
  wal:         { nazwa: "Wał przeciwpowodziowy", kolor: "#18a338" }
};
