# HYDROTECH – strona Koła Naukowego (Politechnika Krakowska, WIŚiE)

Interaktywna strona z fotoreportażami z obiektów hydrotechnicznych: zapór, jazów, śluz, elektrowni wodnych i wałów przeciwpowodziowych.
Kolorystyka i krój pisma (Work Sans) nawiązują do stron Politechniki Krakowskiej, w nagłówku i stopce jest logo Wydziału Inżynierii Środowiska i Energetyki.

**Strona nie wymaga serwera, bazy danych ani żadnej płatnej usługi.** To czyste HTML + CSS + JavaScript, które można za darmo opublikować na GitHub Pages.

## Co jest na stronie

| Element | Co robi |
|---|---|
| Interaktywny przekrój zapory | Klikalne punkty z opisem elementów zapory (NPP, korona, galeria kontrolna, upust denny…) |
| Fotoreportaże | Karty z filtrami według rodzaju obiektu, wyszukiwarką i sortowaniem. Filtry zapisują się w adresie strony, więc można wysłać komuś link do wyfiltrowanej listy |
| Mapa obiektów | Mapa OpenStreetMap z kolorowymi pinezkami. Przycisk „Na mapie” na karcie przenosi do obiektu |
| Strona reportażu | Opis, parametry techniczne, mini-mapa, galeria z powiększaniem zdjęć (strzałki ←/→, Esc, przesuwanie palcem na telefonie), przyciski „wcześniejszy/późniejszy wyjazd” |
| Kalendarium wyjazdów | Generuje się samo z dat reportaży |
| Słowniczek hydrotechniczny | Rozwijane hasła z wyszukiwarką |
| Statystyki | Liczba reportaży, zdjęć, rzek i rodzajów obiektów, liczona automatycznie |

## Struktura plików

```
index.html            – strona główna
reportaz.html         – szablon strony pojedynczego reportażu (reportaz.html?id=solina)
data/config.js        – nazwa koła, e-mail, Facebook/Instagram, opiekun, opis
data/reportaze.js     – WSZYSTKIE fotoreportaże (tu dodajesz nowe)
zdjecia/<id>/         – zdjęcia reportażu (np. zdjecia/solina/01.jpg)
assets/css/style.css  – wygląd strony
assets/js/            – skrypty (filtry, mapa, galeria)
assets/img/           – logo wydziału (kolorowe i białe), znak HYDROTECH, favicon
assets/vendor/leaflet – biblioteka map Leaflet (licencja BSD-2)
```

## Jak dodać nowy fotoreportaż

1. Utwórz folder `zdjecia/<id>/`, np. `zdjecia/zapora-klimkowka/`, i wrzuć do niego zdjęcia (`01.jpg`, `02.jpg`, …).
2. Otwórz `data/reportaze.js`, skopiuj jeden blok `{ ... },` i wklej go na początku listy.
3. Zmień `id` (bez polskich znaków i spacji, taki sam jak nazwa folderu), tytuł, datę (`RRRR-MM-DD`), rzekę, współrzędne itd.
4. W `zdjecia` wpisz nazwy plików i podpisy:
   ```js
   zdjecia: [
     { plik: "01.jpg", opis: "Widok na zaporę od strony wody dolnej" },
     { plik: "02.jpg", opis: "Galeria kontrolna" }
   ]
   ```
5. Usuń linijkę `demo: true`.
6. Gdy zastąpisz już wszystkie przykłady, ustaw w `data/config.js` wartość `pokazInfoDemo: false`.

Gdy pole `plik` jest puste albo pliku nie ma, strona pokazuje grafikę zastępczą z napisem „Miejsce na Twoje zdjęcie”.

**Współrzędne:** w Google Maps kliknij prawym przyciskiem na obiekt i skopiuj liczby, np. `49.3953, 22.4547`.

**Zdjęcia:** przed wrzuceniem zmniejsz je do ok. 2000 px szerokości (np. za darmo na [squoosh.app](https://squoosh.app)). Zdjęcie powinno ważyć 200–500 kB. Strona będzie się szybko ładować, a repozytorium nie przekroczy limitu GitHuba (zalecane do 1 GB, czyli kilka tysięcy zdjęć).

> ⚠️ Sześć reportaży w `data/reportaze.js` to **przykłady**. Parametry techniczne podano poglądowo, więc przed publikacją sprawdź je w źródłach (zarządca obiektu, Wody Polskie) albo zastąp własnymi danymi.

## Podgląd na własnym komputerze

Wystarczy dwukrotnie kliknąć `index.html`. Można też uruchomić lokalny serwer w folderze projektu:

```bash
python -m http.server 8000
# potem otwórz http://localhost:8000
```

## Publikacja za darmo – GitHub Pages

1. Scal gałąź ze stroną do gałęzi `main` (np. przez Pull Request na GitHubie).
2. Na GitHubie wejdź w repozytorium **Settings → Pages**.
3. W **Source** wybierz *Deploy from a branch*, gałąź `main`, folder `/ (root)` i kliknij **Save**.
4. Po 1–2 minutach strona będzie dostępna pod adresem `https://gasparakr-ops.github.io/hydrotech-1/`.

Każda zmiana wypchnięta na `main` aktualizuje stronę automatycznie.

### Własna domena (opcjonalnie)

* **Subdomena uczelni**, np. `hydrotech.pk.edu.pl`. Warto zapytać Centrum Cyfryzacji PK lub opiekuna koła, bo koła naukowe często dostają taką subdomenę bezpłatnie.
* **Własna domena .pl.** Kupujesz ją u dowolnego rejestratora, a w Settings → Pages wpisujesz ją w polu *Custom domain*.

## Koszty (najtańsza droga)

| Pozycja | Koszt |
|---|---|
| Hosting (GitHub Pages, publiczne repozytorium) | **0 zł** |
| Adres `gasparakr-ops.github.io/hydrotech-1` | **0 zł** |
| Certyfikat HTTPS | **0 zł** (automatycznie) |
| Mapa (OpenStreetMap + Leaflet) i czcionka (Google Fonts) | **0 zł** |
| Subdomena `*.pk.edu.pl` (jeśli uczelnia ją przydzieli) | **0 zł** |
| *Opcjonalnie:* własna domena `.pl` | zwykle kilka–kilkadziesiąt zł za 1. rok, potem ok. 50–150 zł/rok, zależnie od rejestratora |

## Logo wydziału

Pliki `assets/img/logo-wisie.svg` (kolorowe) i `assets/img/logo-wisie-biale.svg` (białe) pochodzą z oficjalnej strony wydziału ([wisie.pk.edu.pl](https://wisie.pk.edu.pl)).
Używanie logo musi być zgodne z Systemem Identyfikacji Wizualnej PK, dlatego przed publikacją strony uzgodnij to z opiekunem koła lub z wydziałem.
Znak HYDROTECH (`assets/img/hydrotech-znak.svg`) jest tymczasowy. Jeśli koło ma własne logo, podmień ten plik.
