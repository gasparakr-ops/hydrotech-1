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
 * UWAGA: poniższe reportaże są PRZYKŁADOWE (demo: true). Dane techniczne podano poglądowo –
 * przed publikacją zweryfikuj je ze źródłami (np. Wody Polskie, zarządca obiektu).
 */
window.HYDROTECH_REPORTAZE = [
  {
    id: "solina",
    demo: true,
    tytul: "Zapora w Solinie",
    podtytul: "Najwyższa zapora w Polsce",
    typy: ["zapora", "zbiornik", "elektrownia"],
    rzeka: "San",
    miejscowosc: "Solina",
    wojewodztwo: "podkarpackie",
    wspolrzedne: [49.3953, 22.4547],
    data: "2026-05-16",
    autorzy: ["Zespół HYDROTECH"],
    lead:
      "Betonowa zapora ciężka na Sanie, która tworzy Jezioro Solińskie – największy pod względem pojemności zbiornik retencyjny w Polsce.",
    tresc: [
      "Zapora w Solinie powstała w latach 1960–1968. Ma 81,8 m wysokości i jest najwyższą zaporą w Polsce. Przy zaporze działa elektrownia wodna, która współpracuje z położonym niżej zbiornikiem Myczkowce.",
      "To miejsce na relację z wyjazdu: jak wyglądało zwiedzanie, które elementy obiektu udało się zobaczyć (korona, galerie kontrolne, hala maszyn), czego dowiedzieliście się od przewodnika i co było dla was najciekawsze z inżynierskiego punktu widzenia.",
      "Możesz dodać dowolnie wiele akapitów – każdy akapit to osobny tekst w cudzysłowie, oddzielony przecinkiem."
    ],
    parametry: {
      "Typ konstrukcji": "betonowa, ciężka",
      "Wysokość": "81,8 m",
      "Długość korony": "664,8 m",
      "Lata budowy": "1960–1968",
      "Pojemność zbiornika": "ok. 472 mln m³"
    },
    okladka: 0,
    zdjecia: [
      { plik: "", opis: "Widok na zaporę od strony wody dolnej" },
      { plik: "", opis: "Korona zapory i Jezioro Solińskie" },
      { plik: "", opis: "Galeria kontrolna wewnątrz korpusu zapory" },
      { plik: "", opis: "Hala maszyn elektrowni wodnej" },
      { plik: "", opis: "Urządzenia upustowe" },
      { plik: "", opis: "Panorama zbiornika z punktu widokowego" },
      { plik: "", opis: "Zdjęcie grupowe uczestników wyjazdu" }
    ]
  },
  {
    id: "czorsztyn-niedzica",
    demo: true,
    tytul: "Zapora Czorsztyn–Niedzica",
    podtytul: "Ziemna zapora na Dunajcu i elektrownia szczytowo-pompowa",
    typy: ["zapora", "zbiornik", "elektrownia"],
    rzeka: "Dunajec",
    miejscowosc: "Niedzica",
    wojewodztwo: "małopolskie",
    wspolrzedne: [49.4262, 20.3069],
    data: "2026-03-21",
    autorzy: ["Zespół HYDROTECH"],
    lead:
      "Zapora ziemna zamykająca Jezioro Czorsztyńskie – zbiornik o kluczowym znaczeniu dla ochrony przeciwpowodziowej doliny Dunajca.",
    tresc: [
      "Zapora w Niedzicy jest zaporą ziemną o wysokości 56 m, ukończoną w 1997 roku. Przy zaporze działa elektrownia wodna z członem pompowym, a poniżej znajduje się zbiornik wyrównawczy Sromowce Wyżne.",
      "To miejsce na relację z wyjazdu – opisz trasę zwiedzania, konstrukcję korpusu ziemnego, uszczelnienie i urządzenia upustowe, które udało się zobaczyć."
    ],
    parametry: {
      "Typ konstrukcji": "ziemna",
      "Wysokość": "56 m",
      "Długość korony": "404 m",
      "Rok ukończenia": "1997",
      "Funkcje": "ochrona przeciwpowodziowa, energetyka, retencja"
    },
    okladka: 1,
    zdjecia: [
      { plik: "", opis: "Skarpa odpowietrzna zapory" },
      { plik: "", opis: "Jezioro Czorsztyńskie z korony zapory" },
      { plik: "", opis: "Budynek elektrowni wodnej" },
      { plik: "", opis: "Wieża upustowa" },
      { plik: "", opis: "Zbiornik wyrównawczy Sromowce Wyżne" },
      { plik: "", opis: "Model przekroju zapory w sali edukacyjnej" }
    ]
  },
  {
    id: "dobczyce",
    demo: true,
    tytul: "Zapora w Dobczycach",
    podtytul: "Skąd Kraków bierze wodę",
    typy: ["zapora", "zbiornik"],
    rzeka: "Raba",
    miejscowosc: "Dobczyce",
    wojewodztwo: "małopolskie",
    wspolrzedne: [49.8807, 20.0887],
    data: "2025-11-08",
    autorzy: ["Zespół HYDROTECH"],
    lead:
      "Zapora na Rabie tworząca Jezioro Dobczyckie – najważniejsze źródło wody pitnej dla Krakowa.",
    tresc: [
      "Zbiornik Dobczycki oddano do eksploatacji w 1986 roku. Poza zaopatrzeniem aglomeracji krakowskiej w wodę pełni funkcję przeciwpowodziową na Rabie.",
      "To miejsce na relację z wyjazdu – np. jak chroniona jest strefa ujęcia wody, jak pracuje przelew i jakie pomiary prowadzi się na zaporze."
    ],
    parametry: {
      "Typ konstrukcji": "ziemna z częścią betonową",
      "Rok oddania": "1986",
      "Funkcje": "zaopatrzenie w wodę, ochrona przeciwpowodziowa"
    },
    okladka: 0,
    zdjecia: [
      { plik: "", opis: "Zapora od strony wody dolnej" },
      { plik: "", opis: "Przelew i niecka wypadowa" },
      { plik: "", opis: "Korona zapory" },
      { plik: "", opis: "Jezioro Dobczyckie" },
      { plik: "", opis: "Ujęcie wody" }
    ]
  },
  {
    id: "roznow",
    demo: true,
    tytul: "Zapora w Rożnowie",
    podtytul: "Przedwojenna betonowa zapora na Dunajcu",
    typy: ["zapora", "zbiornik", "elektrownia"],
    rzeka: "Dunajec",
    miejscowosc: "Rożnów",
    wojewodztwo: "małopolskie",
    wspolrzedne: [49.7618, 20.6781],
    data: "2025-10-18",
    autorzy: ["Zespół HYDROTECH"],
    lead:
      "Betonowa zapora ciężka, której budowę rozpoczęto przed wojną – dziś zamyka Jezioro Rożnowskie.",
    tresc: [
      "Zapora w Rożnowie powstawała w latach 1935–1941. Razem z położonym niżej zbiornikiem Czchów tworzy zespół zbiorników na Dunajcu, a przy zaporze pracuje elektrownia wodna.",
      "To miejsce na relację z wyjazdu – historia budowy, stan techniczny konstrukcji, zamknięcia przelewów."
    ],
    parametry: {
      "Typ konstrukcji": "betonowa, ciężka",
      "Lata budowy": "1935–1941",
      "Zbiornik wyrównawczy": "Czchów"
    },
    okladka: 0,
    zdjecia: [
      { plik: "", opis: "Zapora i przelewy" },
      { plik: "", opis: "Elektrownia wodna" },
      { plik: "", opis: "Zamknięcia przelewów" },
      { plik: "", opis: "Jezioro Rożnowskie" },
      { plik: "", opis: "Tablica pamiątkowa z czasu budowy" },
      { plik: "", opis: "Dolina Dunajca poniżej zapory" }
    ]
  },
  {
    id: "porabka-zar",
    demo: true,
    tytul: "Elektrownia Porąbka–Żar",
    podtytul: "Elektrownia szczytowo-pompowa ukryta w górze",
    typy: ["elektrownia", "zbiornik", "zapora"],
    rzeka: "Soła",
    miejscowosc: "Międzybrodzie Bialskie",
    wojewodztwo: "śląskie",
    wspolrzedne: [49.7957, 19.2116],
    data: "2025-06-07",
    autorzy: ["Zespół HYDROTECH"],
    lead:
      "Elektrownia szczytowo-pompowa z górnym zbiornikiem na szczycie góry Żar i podziemną halą maszyn.",
    tresc: [
      "Elektrownia Porąbka–Żar została uruchomiona w 1979 roku. Dolnym zbiornikiem jest Jezioro Międzybrodzkie, utworzone przez zaporę w Porąbce na Sole. Hala maszyn znajduje się w podziemnej kawernie.",
      "To miejsce na relację z wyjazdu – zasada działania elektrowni szczytowo-pompowej, rurociągi, zbiornik górny i wrażenia z podziemnej części obiektu."
    ],
    parametry: {
      "Rodzaj": "elektrownia szczytowo-pompowa",
      "Rok uruchomienia": "1979",
      "Moc": "ok. 500 MW",
      "Zbiornik dolny": "Jezioro Międzybrodzkie"
    },
    okladka: 0,
    zdjecia: [
      { plik: "", opis: "Górny zbiornik na szczycie Żaru" },
      { plik: "", opis: "Tunel dojazdowy do kawerny" },
      { plik: "", opis: "Podziemna hala maszyn" },
      { plik: "", opis: "Jezioro Międzybrodzkie" },
      { plik: "", opis: "Zapora w Porąbce" }
    ]
  },
  {
    id: "stopien-dabie",
    demo: true,
    tytul: "Stopień Wodny Dąbie",
    podtytul: "Jaz i śluza na Wiśle w Krakowie",
    typy: ["jaz", "sluza"],
    rzeka: "Wisła",
    miejscowosc: "Kraków",
    wojewodztwo: "małopolskie",
    wspolrzedne: [50.0512, 19.9922],
    data: "2025-04-12",
    autorzy: ["Zespół HYDROTECH"],
    lead:
      "Stopień wodny w granicach Krakowa – piętrzy Wisłę i umożliwia żeglugę dzięki śluzie komorowej.",
    tresc: [
      "Stopień Wodny Dąbie jest jednym ze stopni kaskady górnej Wisły. Składa się z jazu piętrzącego wodę oraz śluzy, przez którą statki pokonują różnicę poziomów.",
      "To miejsce na relację z wyjazdu – działanie zamknięć jazu, śluzowanie, przepławka dla ryb (jeśli występuje) i rola stopnia w mieście."
    ],
    parametry: {
      "Elementy": "jaz, śluza komorowa",
      "Rzeka": "Wisła",
      "Lokalizacja": "Kraków"
    },
    okladka: 0,
    zdjecia: [
      { plik: "", opis: "Jaz – widok z brzegu" },
      { plik: "", opis: "Komora śluzy" },
      { plik: "", opis: "Wrota śluzy" },
      { plik: "", opis: "Sterownia" },
      { plik: "", opis: "Wisła poniżej stopnia" }
    ]
  }
];
