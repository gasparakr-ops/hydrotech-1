/*
 * USTAWIENIA STRONY KOŁA NAUKOWEGO HYDROTECH
 * ------------------------------------------
 * Zmieniaj tylko wartości w cudzysłowach. Puste pole ("") = element się nie wyświetli.
 */
window.HYDROTECH_CONFIG = {
  nazwa: "HYDROTECH",
  pelnaNazwa: "Koło Naukowe HYDROTECH",
  uczelnia: "Politechnika Krakowska im. Tadeusza Kościuszki",
  wydzial: "Wydział Inżynierii Środowiska i Energetyki",
  adres: "ul. Warszawska 24, 31-155 Kraków",

  // UZUPEŁNIJ: dane kontaktowe koła
  email: "hydrotech.edu.pk@gmail.com",
  facebook: "",   // np. "https://www.facebook.com/twoja-strona"
  instagram: "",  // np. "https://www.instagram.com/twoj-profil"
  opiekun: "",    // np. "dr inż. Jan Kowalski"

  // Krótki opis koła widoczny w sekcji „O kole”
  opis:
    "Jesteśmy studenckim kołem naukowym działającym na Wydziale Inżynierii Środowiska i Energetyki " +
    "Politechniki Krakowskiej. Odwiedzamy zapory, jazy, śluzy, elektrownie wodne i wały przeciwpowodziowe, " +
    "a z każdego wyjazdu przygotowujemy fotoreportaż – z opisem konstrukcji, parametrami technicznymi i zdjęciami.",

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
