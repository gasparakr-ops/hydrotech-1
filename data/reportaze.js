/*
 * FOTOREPORTAŻE KOŁA NAUKOWEGO HYDROTECH
 * --------------------------------------
 * Każdy reportaż to jeden blok { ... } na liście poniżej.
 *
 * Jak dodać nowy reportaż:
 *  1. Skopiuj cały blok jednego reportażu (od { do },) i wklej na początku listy.
 *  2. Zmień "id" na unikalną nazwę bez polskich znaków i spacji, np. "zapora-klimkowka".
 *  3. Utwórz folder zdjecia/<id>/ i wrzuć do niego zdjęcia (np. 01.jpg, 02.jpg ...).
 *  4. W "zdjecia" wpisz nazwy plików i podpisy. Pierwsze zdjęcie (lub to wskazane w "okladka") jest okładką.
 *  5. Usuń linijkę demo: true.
 *
 * "typy" – dowolne z: zapora, zbiornik, jaz, sluza, elektrownia, wal (patrz data/config.js)
 * "wspolrzedne" – [szerokość, długość] geograficzna, np. skopiowane z Google Maps / OpenStreetMap
 * "data" – data wyjazdu w formacie RRRR-MM-DD
 *
 * "zrodla" – (opcjonalnie) lista źródeł danych technicznych: { nazwa: "...", url: "..." }
 *
 * UWAGA: poniższy reportaż jest PRZYKŁADOWY (demo: true) – data wyjazdu i zdjęcia są do uzupełnienia,
 * a dane techniczne pochodzą z Wikipedii i warto je potwierdzić u zarządcy obiektu (Wody Polskie).
 */
window.HYDROTECH_REPORTAZE = [
  {
    id: "stopien-kosciuszko",
    demo: true,
    tytul: "Stopień Wodny Kościuszko",
    podtytul: "Jaz, śluza i elektrownia na Wiśle pod mostem autostrady A4",
    typy: ["jaz", "sluza", "elektrownia"],
    rzeka: "Wisła",
    miejscowosc: "Kryspinów (gm. Liszki)",
    wojewodztwo: "małopolskie",
    wspolrzedne: [50.0308, 19.8192],
    data: "2026-10-17",
    autorzy: ["Zespół HYDROTECH"],
    lead:
      "Stopień wodny na Wiśle tuż przy zachodniej granicy Krakowa – z jazem, śluzą komorową, przepławką dla ryb i małą elektrownią wodną.",
    tresc: [
      "Stopień Wodny Kościuszko oddano do użytku w 1990 roku. Leży w gminie Liszki, przy zachodniej granicy Krakowa, i jest jednym z elementów kaskady Górnej Wisły – powyżej znajduje się stopień Łączany, a poniżej stopień Dąbie.",
      "W skład stopnia wchodzą: trójprzęsłowy jaz o przęsłach szerokości 32 m, śluza komorowa o długości 190 m i szerokości 12 m, zapora ziemna, sterownia, przepławka dla ryb oraz mała elektrownia wodna o mocy ok. 3 MW. Nad stopniem przebiega most zachodniej obwodnicy Krakowa w ciągu autostrady A4.",
      "Tuż poniżej stopnia znajduje się krakowski tor kajakarstwa górskiego, a przez śluzę prowadzi trasa tramwaju wodnego z centrum Krakowa do Tyńca.",
      "To miejsce na relację z wyjazdu: jak wyglądało zwiedzanie, co pokazał przewodnik (np. sterownię, zamknięcia jazu, śluzowanie, przepławkę), jakie pomiary i urządzenia udało się zobaczyć i co było najciekawsze z inżynierskiego punktu widzenia."
    ],
    parametry: {
      "Rzeka": "Wisła",
      "Oddanie do użytku": "1990",
      "Jaz": "3 przęsła × 32 m",
      "Śluza (dł. × szer.)": "190 × 12 m",
      "Spad": "4,4 m",
      "Elektrownia wodna": "ok. 3 MW",
      "Pozostałe elementy": "zapora ziemna, przepławka, sterownia"
    },
    zrodla: [
      { nazwa: "Wikipedia – Stopień Wodny Kościuszko", url: "https://pl.wikipedia.org/wiki/Stopie%C5%84_Wodny_Ko%C5%9Bciuszko" }
    ],
    okladka: 0,
    zdjecia: [
      { plik: "", opis: "Jaz trójprzęsłowy – widok od strony wody dolnej" },
      { plik: "", opis: "Komora śluzy" },
      { plik: "", opis: "Mała elektrownia wodna" },
      { plik: "", opis: "Zamknięcia jazu z bliska" },
      { plik: "", opis: "Wrota śluzy" },
      { plik: "", opis: "Przepławka dla ryb" },
      { plik: "", opis: "Most autostrady A4 nad stopniem wodnym" },
      { plik: "", opis: "Tor kajakarstwa górskiego poniżej stopnia" }
    ]
  }
];
