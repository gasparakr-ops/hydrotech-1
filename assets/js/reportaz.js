/* HYDROTECH – podstrona fotoreportażu: treść, parametry, galeria, lightbox, mini-mapa */
(function () {
  "use strict";
  var HT = window.HT;
  var esc = HT.esc, icon = HT.icon;
  var root = document.getElementById("reportaz");
  var id = new URLSearchParams(location.search).get("id");
  var rep = id ? HT.findReportaz(id) : null;

  if (!rep) {
    root.innerHTML =
      '<section class="rhead"><div class="container" style="padding-bottom:64px">' +
      '<nav class="crumbs" aria-label="Okruszki"><a href="./">Strona główna</a><span aria-hidden="true">/</span><a href="./#reportaze">Fotoreportaże</a></nav>' +
      "<h1>Nie znaleziono reportażu</h1><p class=\"rhead__sub\">Ten fotoreportaż nie istnieje albo zmienił adres.</p>" +
      '<a class="btn btn--primary" href="./#reportaze">' + icon("arrowLeft") + "Wróć do listy reportaży</a></div></section>";
    HT.initChrome();
    return;
  }

  document.title = rep.tytul + " – fotoreportaż | HYDROTECH";
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && rep.lead) metaDesc.setAttribute("content", rep.lead);

  var photos = rep.zdjecia || [];
  var ci = HT.coverIndex(rep);
  var sorted = HT.REPORTAZE.slice().sort(HT.byDateDesc);
  var pos = sorted.indexOf(rep);
  var newer = sorted[pos - 1], older = sorted[pos + 1];

  var params = rep.parametry || {};
  var paramKeys = Object.keys(params);

  var html = "";
  // Nagłówek
  html += '<section class="rhead"><div class="container">' +
    '<nav class="crumbs" aria-label="Okruszki"><a href="./">Strona główna</a><span aria-hidden="true">/</span><a href="./#reportaze">Fotoreportaże</a><span aria-hidden="true">/</span><span>' + esc(rep.tytul) + "</span></nav>" +
    HT.badges(rep) +
    "<h1>" + esc(rep.tytul) + "</h1>" +
    (rep.podtytul ? '<p class="rhead__sub">' + esc(rep.podtytul) + "</p>" : "") +
    '<div class="meta">' +
    (rep.data ? "<span>" + icon("calendar") + 'Wyjazd: <time datetime="' + esc(rep.data) + '">' + esc(HT.fmtDate(rep.data)) + "</time></span>" : "") +
    (rep.miejscowosc ? "<span>" + icon("pin") + esc([rep.miejscowosc, rep.wojewodztwo].filter(Boolean).join(", ")) + "</span>" : "") +
    (rep.rzeka ? "<span>" + icon("river") + "Rzeka: " + esc(rep.rzeka) + "</span>" : "") +
    (photos.length ? "<span>" + icon("camera") + photos.length + " " + HT.plural(photos.length, "zdjęcie", "zdjęcia", "zdjęć") + "</span>" : "") +
    (rep.autorzy && rep.autorzy.length ? "<span>" + icon("user") + esc(rep.autorzy.join(", ")) + "</span>" : "") +
    "</div></div></section>";

  // Okładka
  if (photos.length) {
    html += '<div class="container rcover"><figure data-open="' + ci + '" tabindex="0" role="button" aria-label="Powiększ zdjęcie: ' + esc(photos[ci].opis || rep.tytul) + '">' +
      HT.imgTag(rep, ci, 'width="1600" height="686" fetchpriority="high"') + "</figure></div>";
  }

  // Treść + panel boczny
  html += '<div class="container rbody"><article>';
  if (rep.demo && HT.CONFIG.pokazInfoDemo) {
    html += '<div class="notice">' + icon("info") + "<p>To jest <strong>przykładowy</strong> fotoreportaż. Uzupełnij datę wyjazdu, relację i zdjęcia w pliku <code>data/reportaze.js</code>.</p></div>";
  }
  if (rep.lead) html += '<p class="rlead">' + esc(rep.lead) + "</p>";
  html += '<div class="rtext">' + (rep.tresc || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>";

  if (photos.length) {
    html += '<h2 style="margin-top:40px">Galeria</h2><div class="gallery">' + photos.map(function (z, i) {
      return '<button type="button" class="gallery__item" data-open="' + i + '" aria-label="Powiększ: ' + esc(z.opis || "zdjęcie " + (i + 1)) + '">' +
        HT.imgTag(rep, i, 'loading="lazy" width="800" height="500"') +
        (z.opis ? '<span class="gallery__cap">' + esc(z.opis) + "</span>" : "") + "</button>";
    }).join("") + "</div>";
  }
  html += "</article>";

  html += '<aside class="raside">';
  if (paramKeys.length) {
    html += '<div class="panel"><h2>Parametry techniczne</h2><dl class="params">' + paramKeys.map(function (k) {
      return "<div><dt>" + esc(k) + "</dt><dd>" + esc(params[k]) + "</dd></div>";
    }).join("") + "</dl>";
    var zr = (rep.zrodla || []).filter(function (z) { return z && (z.nazwa || z.url); });
    if (zr.length) {
      html += '<p class="panel__note">Źródło: ' + zr.map(function (z) {
        return z.url ? '<a href="' + esc(z.url) + '" target="_blank" rel="noopener">' + esc(z.nazwa || z.url) + "</a>" : esc(z.nazwa);
      }).join(", ") + "</p>";
    }
    if (rep.demo) html += '<p class="panel__note">Dane przykładowe – potwierdź je u zarządcy obiektu.</p>';
    html += "</div>";
  }
  if (rep.wspolrzedne) {
    html += '<div class="panel"><h2>Lokalizacja</h2><div class="map map--small" id="minimap" role="region" aria-label="Mapa lokalizacji obiektu"></div>' +
      '<p class="panel__note"><a href="https://www.openstreetmap.org/?mlat=' + rep.wspolrzedne[0] + "&mlon=" + rep.wspolrzedne[1] + "#map=14/" + rep.wspolrzedne[0] + "/" + rep.wspolrzedne[1] +
      '" target="_blank" rel="noopener">Otwórz w OpenStreetMap ↗</a></p></div>';
  }
  html += '<div class="panel"><h2>Udostępnij</h2><div class="share">' +
    '<button type="button" class="btn btn--outline btn--sm" id="share">' + icon("share") + "Kopiuj link</button></div></div>";
  html += "</aside></div>";

  // Poprzedni / następny
  if (newer || older) {
    html += '<div class="container" style="padding-bottom:72px"><nav class="pager" aria-label="Inne reportaże">' +
      (older ? '<a class="prev" href="reportaz.html?id=' + encodeURIComponent(older.id) + '"><small>← Wcześniejszy wyjazd</small><strong>' + esc(older.tytul) + "</strong></a>" : "<span></span>") +
      (newer ? '<a class="next" href="reportaz.html?id=' + encodeURIComponent(newer.id) + '"><small>Późniejszy wyjazd →</small><strong>' + esc(newer.tytul) + "</strong></a>" : "") +
      "</nav></div>";
  }

  root.innerHTML = html;
  HT.initChrome();

  /* ---------- Mini-mapa ---------- */
  if (rep.wspolrzedne) {
    var mm = HT.createMap(document.getElementById("minimap"), { center: rep.wspolrzedne, zoom: 12 });
    if (mm) L.marker(rep.wspolrzedne, { icon: HT.markerIcon(rep), title: rep.tytul, alt: rep.tytul }).addTo(mm);
  }

  /* ---------- Kopiuj link ---------- */
  var shareBtn = document.getElementById("share");
  if (shareBtn) shareBtn.addEventListener("click", function () {
    var url = location.href;
    function done(msg) {
      var old = shareBtn.innerHTML;
      shareBtn.textContent = msg;
      setTimeout(function () { shareBtn.innerHTML = old; }, 1800);
    }
    if (navigator.share && matchMedia("(pointer: coarse)").matches) {
      navigator.share({ title: rep.tytul, url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () { done("Skopiowano ✓"); }, function () { done(url); });
    } else done(url);
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-cap");
  var lbCount = document.getElementById("lb-count");
  var current = 0, lastFocus = null;

  function show(i) {
    current = (i + photos.length) % photos.length;
    var z = photos[current] || {};
    lbImg.dataset.phDone = "";
    lbImg.dataset.phType = HT.photoType(rep, current);
    lbImg.dataset.phSeed = rep.id + "-" + current;
    lbImg.src = HT.photoSrc(rep, current);
    lbImg.alt = z.opis || rep.tytul;
    lbCap.innerHTML = esc(z.opis || "") + "<small>" + esc(rep.tytul) + (rep.data ? " · " + esc(HT.fmtDate(rep.data)) : "") + "</small>";
    lbCount.textContent = "Zdjęcie " + (current + 1) + " z " + photos.length;
    // wczytaj sąsiednie zdjęcia z wyprzedzeniem
    [current + 1, current - 1].forEach(function (k) {
      var j = (k + photos.length) % photos.length;
      if ((photos[j] || {}).plik) { var im = new Image(); im.src = HT.photoSrc(rep, j); }
    });
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    document.getElementById("lb-close").focus();
  }
  function close() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () { lb.hidden = true; }, 180);
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open]");
    if (t) open(+t.dataset.open);
  });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) {
      var t = e.target.closest && e.target.closest("figure[data-open]");
      if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(+t.dataset.open); }
      return;
    }
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "Tab") {
      // pułapka fokusu w oknie
      var f = lb.querySelectorAll("button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { show(current + 1); });
  var swiped = false;
  lb.addEventListener("click", function (e) {
    if (swiped) { swiped = false; return; }
    if (e.target === lb || e.target.classList.contains("lb__fig")) close();
  });
  // przesuwanie palcem
  var x0 = null;
  lb.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
  lb.addEventListener("pointerup", function (e) {
    if (x0 === null) return;
    var dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) { swiped = true; show(current + (dx < 0 ? 1 : -1)); }
  });
})();
