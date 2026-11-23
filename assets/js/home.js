/* HYDROTECH – strona główna: filtry, karty, mapa, kalendarium, słowniczek, przekrój zapory */
(function () {
  "use strict";
  var HT = window.HT;
  var esc = HT.esc, icon = HT.icon;
  var ALL = HT.REPORTAZE.slice().sort(HT.byDateDesc);

  HT.initChrome();

  /* ======================================================
     1. Interaktywny przekrój zapory (hero)
     ====================================================== */
  var HOTSPOTS = [
    { x: 130, y: 100, t: "Normalny poziom piętrzenia (NPP)", d: "Najwyższy poziom wody utrzymywany w zbiorniku w normalnych warunkach eksploatacji. Oznaczany na rysunkach symbolem ▽." },
    { x: 275, y: 62,  t: "Korona zapory", d: "Najwyżej położona część zapory – zwykle prowadzi po niej droga lub chodnik inspekcyjny." },
    { x: 314, y: 248, t: "Galeria kontrolna", d: "Korytarz wewnątrz korpusu zapory, z którego prowadzi się pomiary, obserwacje i odwodnienie konstrukcji." },
    { x: 372, y: 190, t: "Strona odpowietrzna", d: "Powierzchnia zapory od strony wody dolnej. W zaporze ciężkiej jej nachylenie wynika z potrzeby przeniesienia parcia wody ciężarem własnym." },
    { x: 395, y: 317, t: "Upust denny", d: "Przewód w dolnej części zapory z zamknięciami – pozwala opróżnić zbiornik i przepuszczać wodę do koryta poniżej." },
    { x: 256, y: 372, t: "Przesłona przeciwfiltracyjna", d: "Uszczelnienie podłoża pod zaporą (np. iniekcyjne), ograniczające przepływ wody pod konstrukcją." }
  ];
  (function initXsec() {
    var stage = document.querySelector(".xsec__stage");
    if (!stage) return;
    var tip = document.createElement("div");
    tip.className = "xsec__tip";
    tip.hidden = true;
    tip.setAttribute("role", "status");
    stage.appendChild(tip);
    var active = null;

    HOTSPOTS.forEach(function (h, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "hotspot";
      b.style.left = (h.x / 600) * 100 + "%";
      b.style.top = (h.y / 400) * 100 + "%";
      b.textContent = "+";
      b.setAttribute("aria-label", h.t);
      b.setAttribute("aria-expanded", "false");
      b.addEventListener("click", function (e) { e.stopPropagation(); active === b ? hide() : show(b, h); });
      b.addEventListener("mouseenter", function () { if (matchMedia("(hover: hover)").matches) show(b, h); });
      b.addEventListener("focus", function () { show(b, h); });
      stage.appendChild(b);
    });

    function show(b, h) {
      if (active) active.setAttribute("aria-expanded", "false");
      active = b;
      b.setAttribute("aria-expanded", "true");
      tip.innerHTML = "<h3>" + esc(h.t) + "</h3><p>" + esc(h.d) + "</p>";
      tip.hidden = false;
      var W = stage.clientWidth, H = stage.clientHeight;
      var px = (h.x / 600) * W, py = (h.y / 400) * H;
      var tw = tip.offsetWidth, th = tip.offsetHeight;
      var left = Math.min(Math.max(px - tw / 2, 0), W - tw);
      var top = py < H * 0.5 ? py + 24 : py - th - 24;
      tip.style.left = left + "px";
      tip.style.top = Math.max(top, -th / 2) + "px";
    }
    function hide() {
      if (active) active.setAttribute("aria-expanded", "false");
      active = null;
      tip.hidden = true;
    }
    document.addEventListener("click", function (e) { if (!e.target.closest(".xsec__stage")) hide(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
    window.addEventListener("resize", hide);
  })();

  /* ======================================================
     2. Statystyki z licznikiem
     ====================================================== */
  (function initStats() {
    var rivers = {}, types = {}, photos = 0;
    ALL.forEach(function (r) {
      if (r.rzeka) rivers[r.rzeka] = 1;
      (r.typy || []).forEach(function (t) { types[t] = 1; });
      photos += (r.zdjecia || []).length;
    });
    var values = { reportaze: ALL.length, zdjecia: photos, rzeki: Object.keys(rivers).length, typy: Object.keys(types).length };
    var els = document.querySelectorAll("[data-stat]");
    els.forEach(function (el) { el.textContent = "0"; el.dataset.target = values[el.dataset.stat] || 0; });
    function run(el) {
      var target = +el.dataset.target, start = null, dur = 1200;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target; return; }
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
      });
      els.forEach(function (el) { io.observe(el); });
    } else els.forEach(run);
  })();

  /* ======================================================
     3. Fotoreportaże – filtry, wyszukiwarka, sortowanie
     ====================================================== */
  var params = new URLSearchParams(location.search);
  var state = { typ: params.get("typ") || "", q: params.get("q") || "", sort: params.get("sort") || "new" };
  var grid = document.getElementById("cards");
  var chipsEl = document.getElementById("chips");
  var searchEl = document.getElementById("search");
  var sortEl = document.getElementById("sort");
  var infoEl = document.getElementById("results-info");

  function counts() {
    var c = {};
    ALL.forEach(function (r) { (r.typy || []).forEach(function (t) { c[t] = (c[t] || 0) + 1; }); });
    return c;
  }
  function renderChips() {
    var c = counts();
    var html = '<button type="button" class="chip" data-typ="" aria-pressed="' + (!state.typ) + '">Wszystkie <span class="chip__count">' + ALL.length + "</span></button>";
    Object.keys(HT.TYPY).forEach(function (k) {
      var t = HT.TYPY[k], n = c[k] || 0;
      html += '<button type="button" class="chip" data-typ="' + esc(k) + '" aria-pressed="' + (state.typ === k) + '"' + (n ? "" : " disabled") +
        '><span class="chip__dot" style="--c:' + esc(t.kolor) + '"></span>' + esc(t.nazwa) + ' <span class="chip__count">' + n + "</span></button>";
    });
    chipsEl.innerHTML = html;
  }
  function filtered() {
    var q = HT.normalize(state.q.trim());
    var list = ALL.filter(function (r) {
      if (state.typ && (r.typy || []).indexOf(state.typ) === -1) return false;
      if (!q) return true;
      var hay = HT.normalize([r.tytul, r.podtytul, r.rzeka, r.miejscowosc, r.wojewodztwo, r.lead].join(" "));
      return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
    });
    var sorters = {
      "new": HT.byDateDesc,
      old: function (a, b) { return HT.byDateDesc(b, a); },
      az: function (a, b) { return a.tytul.localeCompare(b.tytul, "pl"); },
      river: function (a, b) { return (a.rzeka || "").localeCompare(b.rzeka || "", "pl") || a.tytul.localeCompare(b.tytul, "pl"); }
    };
    return list.sort(sorters[state.sort] || sorters["new"]);
  }
  function card(r) {
    var ci = HT.coverIndex(r);
    var n = (r.zdjecia || []).length;
    var url = "reportaz.html?id=" + encodeURIComponent(r.id);
    return '<article class="card reveal">' +
      '<div class="card__media">' + HT.imgTag(r, ci, 'loading="lazy" width="800" height="500"') +
      (r.demo ? '<span class="card__demo">Przykład</span>' : "") +
      (n ? '<span class="card__photos">' + icon("camera") + n + " zdj.</span>" : "") + "</div>" +
      '<div class="card__body">' + HT.badges(r) +
      '<h3 class="card__title"><a href="' + url + '">' + esc(r.tytul) + "</a></h3>" +
      '<p class="card__lead">' + esc(r.lead || r.podtytul || "") + "</p>" +
      '<div class="meta">' +
      (r.rzeka ? "<span>" + icon("river") + esc(r.rzeka) + "</span>" : "") +
      (r.miejscowosc ? "<span>" + icon("pin") + esc(r.miejscowosc) + "</span>" : "") +
      (r.data ? "<span>" + icon("calendar") + '<time datetime="' + esc(r.data) + '">' + esc(HT.fmtDate(r.data)) + "</time></span>" : "") +
      "</div>" +
      '<div class="card__footer"><span class="card__more">Czytaj reportaż ' + icon("arrow") + "</span>" +
      (r.wspolrzedne ? '<button type="button" class="card__map" data-map="' + esc(r.id) + '">' + icon("pin") + "Na mapie</button>" : "") +
      "</div></div></article>";
  }
  function render() {
    var list = filtered();
    grid.innerHTML = list.length ? list.map(card).join("") :
      '<div class="empty" style="grid-column:1/-1"><h3>Brak wyników</h3><p>Zmień filtr lub wpisz inną frazę.</p>' +
      '<button type="button" class="btn btn--outline btn--sm" id="reset">Pokaż wszystkie</button></div>';
    infoEl.textContent = list.length === ALL.length ? "Fotoreportaże: " + ALL.length :
      "Znaleziono: " + list.length + " z " + ALL.length;
    grid.querySelectorAll(".reveal").forEach(function (el, i) {
      setTimeout(function () { el.classList.add("is-visible"); }, 40 * i);
    });
    var reset = document.getElementById("reset");
    if (reset) reset.addEventListener("click", function () { state.typ = ""; state.q = ""; searchEl.value = ""; renderChips(); update(); });
    updateMap(list);
  }
  function syncUrl() {
    var p = new URLSearchParams();
    if (state.typ) p.set("typ", state.typ);
    if (state.q) p.set("q", state.q);
    if (state.sort !== "new") p.set("sort", state.sort);
    var qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
  }
  function update() { syncUrl(); render(); }

  if (grid) {
    searchEl.value = state.q;
    sortEl.value = state.sort;
    renderChips();
    chipsEl.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b || b.disabled) return;
      state.typ = b.dataset.typ;
      chipsEl.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
      update();
    });
    var t;
    searchEl.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () { state.q = searchEl.value; update(); }, 150);
    });
    sortEl.addEventListener("change", function () { state.sort = sortEl.value; update(); });
    grid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-map]");
      if (b) { e.preventDefault(); showOnMap(b.dataset.map); }
    });
  }

  /* Informacja o treściach przykładowych */
  (function demoNotice() {
    var el = document.getElementById("demo-notice");
    if (!el) return;
    var hasDemo = ALL.some(function (r) { return r.demo; });
    var dismissed = false;
    try { dismissed = sessionStorage.getItem("ht-demo-off") === "1"; } catch (e) {}
    if (!HT.CONFIG.pokazInfoDemo || !hasDemo || dismissed) return;
    el.hidden = false;
    el.insertAdjacentHTML("afterbegin", icon("info"));
    el.querySelector("button").addEventListener("click", function () {
      el.hidden = true;
      try { sessionStorage.setItem("ht-demo-off", "1"); } catch (e) {}
    });
  })();

  /* ======================================================
     4. Mapa obiektów
     ====================================================== */
  var map = HT.createMap(document.getElementById("map"), { center: [49.9, 20.4], zoom: 7 });
  var markers = {};
  var layer = map ? L.featureGroup().addTo(map) : null;
  var listEl = document.getElementById("map-list");

  (function legend() {
    var el = document.getElementById("legend");
    if (!el) return;
    el.innerHTML = Object.keys(HT.TYPY).map(function (k) {
      var t = HT.TYPY[k];
      return '<li><span class="chip__dot" style="--c:' + esc(t.kolor) + '"></span>' + esc(t.nazwa) + "</li>";
    }).join("");
  })();

  function updateMap(list) {
    if (!map) return;
    layer.clearLayers();
    markers = {};
    var withCoords = list.filter(function (r) { return r.wspolrzedne && r.wspolrzedne.length === 2; });
    withCoords.forEach(function (r) {
      var m = L.marker(r.wspolrzedne, { icon: HT.markerIcon(r), title: r.tytul, alt: r.tytul })
        .bindPopup(HT.popupHTML(r), { maxWidth: 260 });
      m.addTo(layer);
      markers[r.id] = m;
    });
    if (withCoords.length) map.fitBounds(layer.getBounds(), { padding: [48, 48], maxZoom: 11 });
    if (listEl) {
      listEl.innerHTML = withCoords.map(function (r) {
        return '<li><button type="button" data-fly="' + esc(r.id) + '"><span class="chip__dot" style="--c:' + esc(HT.typ(r.typy[0]).kolor) +
          '"></span><span><strong>' + esc(r.tytul) + "</strong><small>" + esc([r.rzeka, r.miejscowosc].filter(Boolean).join(" · ")) + "</small></span></button></li>";
      }).join("") || '<li style="padding:12px 4px;color:var(--muted)">Brak obiektów dla wybranego filtra.</li>';
    }
  }
  function fly(id) {
    var m = markers[id];
    if (!m) return;
    map.flyTo(m.getLatLng(), 11, { duration: 0.8 });
    map.once("moveend", function () { m.openPopup(); });
  }
  function showOnMap(id) {
    var sec = document.getElementById("mapa");
    sec.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setTimeout(function () { fly(id); }, 450);
  }
  if (listEl) listEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-fly]");
    if (b) fly(b.dataset.fly);
  });

  /* ======================================================
     5. Kalendarium wyjazdów
     ====================================================== */
  (function timeline() {
    var el = document.getElementById("timeline");
    if (!el) return;
    var html = "", year = null;
    ALL.slice(0, 8).forEach(function (r) {
      var y = (r.data || "").slice(0, 4);
      if (y !== year) {
        if (year !== null) html += "</ol>";
        html += '<div class="timeline__year">' + esc(y) + "</div><ol>";
        year = y;
      }
      html += '<li style="--c:' + esc(HT.typ((r.typy || [])[0]).kolor) + '"><time datetime="' + esc(r.data) + '">' + esc(HT.fmtDate(r.data)) + "</time>" +
        '<a href="reportaz.html?id=' + encodeURIComponent(r.id) + '">' + esc(r.tytul) + "</a><small>" +
        esc([r.rzeka, r.wojewodztwo].filter(Boolean).join(" · ")) + "</small></li>";
    });
    if (year !== null) html += "</ol>";
    el.innerHTML = html;
  })();

  /* ======================================================
     6. Słowniczek hydrotechniczny
     ====================================================== */
  var TERMS = [
    ["Stopień wodny", "Zespół budowli hydrotechnicznych w jednym przekroju rzeki – np. jaz lub zapora, śluza, elektrownia i przepławka – piętrzących wodę i wykorzystujących różnicę jej poziomów."],
    ["Zapora", "Budowla przegradzająca dolinę rzeki i tworząca zbiornik wodny. Ze względu na materiał wyróżnia się m.in. zapory ziemne, narzutowe i betonowe (ciężkie, łukowe, przyporowe)."],
    ["Jaz", "Budowla piętrząca wodę w korycie rzeki, zwykle z ruchomymi zamknięciami (np. segmentowymi, klapowymi), które pozwalają regulować poziom wody i przepuszczać wezbrania."],
    ["Śluza komorowa", "Urządzenie pozwalające jednostkom pływającym pokonać różnicę poziomów wody. Komora zamykana jest wrotami górnymi i dolnymi, a poziom wody w niej wyrównuje się z poziomem górnym lub dolnym."],
    ["Przepławka", "Urządzenie umożliwiające rybom wędrówkę w górę i w dół rzeki przez budowlę piętrzącą."],
    ["NPP – normalny poziom piętrzenia", "Najwyższy poziom wody utrzymywany w zbiorniku w normalnych warunkach eksploatacji."],
    ["Przelew", "Urządzenie do odprowadzania nadmiaru wody ze zbiornika, szczególnie w czasie wezbrań; może być stały lub wyposażony w zamknięcia."],
    ["Upust denny", "Przewód w dolnej części zapory, służący do opróżniania zbiornika i przepuszczania wody do koryta poniżej."],
    ["Niecka wypadowa", "Umocnione zagłębienie poniżej przelewu lub jazu, w którym rozpraszana jest energia spływającej wody, co chroni koryto przed rozmyciem."],
    ["Elektrownia szczytowo-pompowa", "Elektrownia magazynująca energię: w okresach nadwyżki pompuje wodę do zbiornika górnego, a w szczycie zapotrzebowania wytwarza energię, spuszczając ją przez turbiny."],
    ["Wał przeciwpowodziowy", "Ziemna budowla ciągnąca się wzdłuż rzeki, chroniąca przyległe tereny przed zalaniem w czasie wezbrań."],
    ["Galeria kontrolna", "Korytarz wewnątrz zapory, służący do obserwacji, pomiarów (np. przemieszczeń i filtracji) oraz odwodnienia korpusu."]
  ];
  (function glossary() {
    var el = document.getElementById("glossary");
    var input = document.getElementById("glossary-search");
    if (!el) return;
    el.innerHTML = TERMS.map(function (t) {
      return '<details class="term" data-term="' + esc(HT.normalize(t[0] + " " + t[1])) + '"><summary>' + esc(t[0]) + "</summary><p>" + esc(t[1]) + "</p></details>";
    }).join("") + '<p class="empty" id="glossary-empty" hidden style="grid-column:1/-1">Nie znaleziono takiego pojęcia.</p>';
    if (input) input.addEventListener("input", function () {
      var q = HT.normalize(input.value.trim()), shown = 0;
      el.querySelectorAll(".term").forEach(function (d) {
        var ok = !q || d.dataset.term.indexOf(q) !== -1;
        d.hidden = !ok;
        if (ok) shown++;
        if (q && ok && shown <= 2) d.open = true;
      });
      document.getElementById("glossary-empty").hidden = shown > 0;
    });
  })();

  if (grid) render();
})();
