/* HYDROTECH – wspólne funkcje dla wszystkich podstron */
(function () {
  "use strict";

  var CONFIG = window.HYDROTECH_CONFIG || {};
  var TYPY = window.HYDROTECH_TYPY || {};
  var REPORTAZE = (window.HYDROTECH_REPORTAZE || []).slice();

  /* ---------- Ikony (inline SVG) ---------- */
  var ICONS = {
    search: '<path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/>',
    river: '<path d="M3 8c3-2 6 2 9 0s6-2 9 0M3 13c3-2 6 2 9 0s6-2 9 0M3 18c3-2 6 2 9 0s6-2 9 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    arrowLeft: '<path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    chevronLeft: '<path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    chevronRight: '<path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    close: '<path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    user: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    info: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="2"/>',
    share: '<circle cx="18" cy="5" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="19" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" stroke="currentColor" stroke-width="2"/>',
    dam: '<path d="M3 20h18M7 20V6h3l5 14M3 9h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M3 13c1 .8 2 .8 4 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    users: '<circle cx="9" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2.5 20c1-3.5 3.6-5.5 6.5-5.5s5.5 2 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.7.8 2.9 2.6 3.5 5.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
  };
  function icon(name, cls) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"' + (cls ? ' class="' + cls + '"' : "") + ">" + (ICONS[name] || "") + "</svg>";
  }

  /* ---------- Pomocnicze ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var dateFmt = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T12:00:00");
    return isNaN(d) ? iso : dateFmt.format(d);
  }
  function typ(key) {
    return TYPY[key] || { nazwa: key, kolor: "#02356f" };
  }
  function badges(rep) {
    return '<div class="badges">' + (rep.typy || []).map(function (t) {
      var info = typ(t);
      return '<span class="badge" style="--c:' + esc(info.kolor) + '">' + esc(info.nazwa) + "</span>";
    }).join("") + "</div>";
  }
  // Polska odmiana: plural(3, "zdjęcie", "zdjęcia", "zdjęć") -> "zdjęcia"
  function plural(n, one, few, many) {
    if (n === 1) return one;
    var d = n % 10, h = n % 100;
    return d >= 2 && d <= 4 && (h < 12 || h > 14) ? few : many;
  }
  function byDateDesc(a, b) { return (b.data || "").localeCompare(a.data || ""); }
  function normalize(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
  }
  function findReportaz(id) {
    for (var i = 0; i < REPORTAZE.length; i++) if (REPORTAZE[i].id === id) return REPORTAZE[i];
    return null;
  }

  /* ---------- Grafiki zastępcze (gdy brak zdjęcia) ----------
     Rysuje prostą ilustrację obiektu w miejscu, gdzie powinno być zdjęcie.
     Po dodaniu własnych plików do zdjecia/<id>/ grafiki znikną automatycznie. */
  function rng(seedStr) {
    var h = 1779033703 ^ seedStr.length;
    for (var i = 0; i < seedStr.length; i++) {
      h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    var a = h >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function ridge(r, y0, amp, step, W) {
    var pts = ["0,1000", "0," + Math.round(y0 + (r() - 0.5) * amp)];
    for (var x = step; x <= W; x += step) pts.push(x + "," + Math.round(y0 + (r() - 0.5) * amp));
    pts.push(W + ",1000");
    return pts.join(" ");
  }
  var SKIES = [
    ["#bcd6f0", "#eef5fc", "#fdfdfb"],
    ["#93b9e0", "#d9e8f7", "#f4f8fc"],
    ["#e9cfae", "#f6e6d2", "#fbf3ea"],
    ["#c4ced9", "#e3e8ee", "#f2f4f7"]
  ];
  function placeholderSVG(type, seed, w, h) {
    var r = rng(seed || "x");
    var W = 1600, H = 1000;
    var sky = SKIES[Math.floor(r() * SKIES.length)];
    var hillA = ["#9fb4c9", "#a7b9c8", "#b2c0cf"][Math.floor(r() * 3)];
    var hillB = ["#6f8c7c", "#7a9483", "#68836f"][Math.floor(r() * 3)];
    var hillC = ["#4d6b59", "#56735f", "#46624f"][Math.floor(r() * 3)];
    var water = "#3f78a8", waterLight = "#6c9dc6";
    var s = "";
    s += '<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + sky[0] + '"/><stop offset=".6" stop-color="' + sky[1] + '"/><stop offset="1" stop-color="' + sky[2] + '"/></linearGradient>';
    s += '<linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + waterLight + '"/><stop offset="1" stop-color="' + water + '"/></linearGradient>';
    s += '<linearGradient id="c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9cfd6"/><stop offset=".5" stop-color="#e4e8ec"/><stop offset="1" stop-color="#b9c0c8"/></linearGradient></defs>';
    s += '<rect width="1600" height="1000" fill="url(#s)"/>';
    // słońce / chmury
    var sx = 200 + r() * 1200, sy = 120 + r() * 120;
    s += '<circle cx="' + sx + '" cy="' + sy + '" r="' + (40 + r() * 30) + '" fill="#fff" opacity=".55"/>';
    for (var c = 0; c < 3; c++) {
      var cx = r() * 1600, cy = 80 + r() * 200;
      s += '<g fill="#fff" opacity="' + (0.35 + r() * 0.3) + '"><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (90 + r() * 80) + '" ry="22"/><ellipse cx="' + (cx + 50) + '" cy="' + (cy - 14) + '" rx="60" ry="24"/></g>';
    }
    s += '<polygon points="' + ridge(r, 430, 160, 160, W) + '" fill="' + hillA + '"/>';

    switch (type) {
      case "zapora": {
        s += '<polygon points="' + ridge(r, 540, 120, 200, W) + '" fill="' + hillB + '"/>';
        var top = 360 + r() * 60, bot = 760, lx = 330 + r() * 80, rx = 1270 - r() * 80;
        s += '<polygon points="0,1000 0,' + (top - 120) + ' ' + (lx - 40) + ',' + (top - 30) + ' ' + (lx + 120) + ',' + bot + ' ' + (lx + 160) + ',1000" fill="' + hillC + '"/>';
        s += '<polygon points="1600,1000 1600,' + (top - 140) + ' ' + (rx + 40) + ',' + (top - 30) + ' ' + (rx - 120) + ',' + bot + ' ' + (rx - 160) + ',1000" fill="' + hillC + '"/>';
        s += '<polygon points="' + lx + ',' + top + ' ' + rx + ',' + top + ' ' + (rx - 110) + ',' + bot + ' ' + (lx + 110) + ',' + bot + '" fill="url(#c)"/>';
        s += '<rect x="' + (lx - 6) + '" y="' + (top - 16) + '" width="' + (rx - lx + 12) + '" height="18" fill="#9aa4ae"/>';
        for (var p = lx; p < rx; p += 26) s += '<rect x="' + p + '" y="' + (top - 30) + '" width="3" height="14" fill="#8a949e"/>';
        var mid = (lx + rx) / 2;
        for (var g = -2; g <= 2; g++) s += '<rect x="' + (mid + g * 70 - 20) + '" y="' + (top + 10) + '" width="40" height="' + (bot - top - 40) + '" fill="#aeb6bf" opacity=".7"/>';
        s += '<path d="M' + (lx + 160) + ' 1000 Q 800 ' + (bot + 20) + ' ' + (rx - 160) + ' 1000Z" fill="url(#w)"/>';
        s += '<rect x="' + (mid - 90) + '" y="' + (bot - 10) + '" width="180" height="40" fill="#fff" opacity=".55"/>';
        break;
      }
      case "zbiornik": {
        s += '<polygon points="' + ridge(r, 560, 110, 180, W) + '" fill="' + hillB + '"/>';
        s += '<rect y="620" width="1600" height="380" fill="url(#w)"/>';
        s += '<rect x="' + (500 + r() * 400) + '" y="608" width="260" height="16" fill="#d5dbe1"/>';
        for (var l = 0; l < 24; l++) {
          var ly = 650 + r() * 330, lx2 = r() * 1500;
          s += '<rect x="' + lx2 + '" y="' + ly + '" width="' + (40 + r() * 120) + '" height="3" rx="1.5" fill="#fff" opacity="' + (0.15 + r() * 0.3) + '"/>';
        }
        s += '<polygon points="0,1000 0,760 260,820 520,1000" fill="' + hillC + '"/>';
        break;
      }
      case "jaz": {
        s += '<polygon points="' + ridge(r, 600, 60, 200, W) + '" fill="' + hillB + '"/>';
        s += '<rect y="600" width="1600" height="130" fill="url(#w)"/>';
        s += '<rect y="700" width="1600" height="110" fill="#8e98a2"/>';
        s += '<rect y="690" width="1600" height="14" fill="#b6bec6"/>';
        var n = 5 + Math.floor(r() * 3), span = 1600 / n;
        for (var i = 0; i <= n; i++) {
          var px = i * span - 30;
          s += '<rect x="' + px + '" y="560" width="60" height="250" fill="url(#c)"/><rect x="' + (px - 6) + '" y="548" width="72" height="16" fill="#9aa4ae"/>';
          if (i < n) s += '<rect x="' + (px + 60) + '" y="630" width="' + (span - 60) + '" height="70" fill="#5f6d7b" opacity=".85"/>';
        }
        s += '<rect y="530" width="1600" height="18" fill="#7d8792"/>';
        s += '<rect y="810" width="1600" height="190" fill="url(#w)"/>';
        for (var f = 0; f < 40; f++) s += '<ellipse cx="' + r() * 1600 + '" cy="' + (820 + r() * 60) + '" rx="' + (20 + r() * 40) + '" ry="6" fill="#fff" opacity="' + (0.4 + r() * 0.4) + '"/>';
        break;
      }
      case "sluza": {
        s += '<polygon points="' + ridge(r, 560, 80, 200, W) + '" fill="' + hillB + '"/>';
        var vx = 700 + r() * 200, vy = 560;
        s += '<polygon points="0,1000 ' + (vx - 80) + ',' + vy + ' ' + (vx + 80) + ',' + vy + ' 1600,1000" fill="url(#w)"/>';
        s += '<polygon points="0,700 ' + (vx - 80) + ',' + (vy - 30) + ' ' + (vx - 80) + ',' + vy + ' 0,1000" fill="url(#c)"/>';
        s += '<polygon points="1600,700 ' + (vx + 80) + ',' + (vy - 30) + ' ' + (vx + 80) + ',' + vy + ' 1600,1000" fill="url(#c)"/>';
        s += '<polygon points="0,690 ' + (vx - 80) + ',' + (vy - 34) + ' ' + (vx - 80) + ',' + (vy - 30) + ' 0,712" fill="#9aa4ae"/>';
        s += '<polygon points="1600,690 ' + (vx + 80) + ',' + (vy - 34) + ' ' + (vx + 80) + ',' + (vy - 30) + ' 1600,712" fill="#9aa4ae"/>';
        s += '<rect x="' + (vx - 80) + '" y="' + (vy - 60) + '" width="160" height="62" fill="#4e5b68"/>';
        s += '<rect x="' + (vx - 90) + '" y="' + (vy - 74) + '" width="180" height="14" fill="#c8302c" opacity=".8"/>';
        for (var b = 0; b < 8; b++) { var by = 720 + b * 34; s += '<rect x="' + (40 + b * 70) + '" y="' + by + '" width="10" height="10" fill="#e8e1d0"/>'; }
        break;
      }
      case "elektrownia": {
        s += '<polygon points="' + ridge(r, 520, 140, 180, W) + '" fill="' + hillB + '"/>';
        s += '<polygon points="0,1000 0,440 520,560 900,760 1000,1000" fill="' + hillC + '"/>';
        var bx = 760 + r() * 160;
        s += '<path d="M150 470 L' + (bx + 20) + ' 700" stroke="#8a949e" stroke-width="18"/><path d="M190 482 L' + (bx + 70) + ' 700" stroke="#9aa4ae" stroke-width="18"/>';
        s += '<rect x="' + bx + '" y="640" width="440" height="200" fill="#e3e6ea"/><polygon points="' + (bx - 20) + ',640 ' + (bx + 460) + ',640 ' + (bx + 430) + ',600 ' + (bx + 10) + ',600" fill="#02356f"/>';
        for (var wx = 0; wx < 8; wx++) s += '<rect x="' + (bx + 26 + wx * 52) + '" y="680" width="32" height="70" fill="#8fb6d8"/>';
        s += '<rect y="820" width="1600" height="180" fill="url(#w)"/>';
        s += '<rect x="' + (bx + 30) + '" y="840" width="380" height="8" fill="#fff" opacity=".5"/>';
        break;
      }
      case "wal": {
        s += '<polygon points="' + ridge(r, 580, 60, 220, W) + '" fill="' + hillB + '"/>';
        s += '<polygon points="0,1000 0,690 1600,630 1600,1000" fill="url(#w)"/>';
        s += '<polygon points="0,1000 0,760 1600,700 1600,1000" fill="#7da069"/>';
        s += '<polygon points="0,790 1600,720 1600,742 0,820" fill="#c8b98f"/>';
        s += '<polygon points="0,1000 0,840 1600,770 1600,1000" fill="#8fb27a"/>';
        for (var t = 0; t < 12; t++) { var tx = r() * 1600; s += '<circle cx="' + tx + '" cy="' + (590 + r() * 40) + '" r="' + (18 + r() * 20) + '" fill="' + hillC + '"/>'; }
        break;
      }
      default:
        s += '<polygon points="' + ridge(r, 600, 120, 200, W) + '" fill="' + hillB + '"/>';
        s += '<rect y="760" width="1600" height="240" fill="url(#w)"/>';
    }
    // znaczek "miejsce na zdjęcie"
    s += '<g transform="translate(40 912)"><rect width="430" height="54" rx="27" fill="#012042" opacity=".72"/>' +
         '<g transform="translate(22 13) scale(1.2)" fill="none" stroke="#fff" stroke-width="2"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></g>' +
         '<text x="66" y="35" font-family="Work Sans, Arial, sans-serif" font-size="22" font-weight="600" fill="#fff">Miejsce na Twoje zdjęcie</text></g>';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="' + (w || 1600) + '" height="' + (h || 1000) + '" preserveAspectRatio="xMidYMid slice">' + s + "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* Ścieżka do zdjęcia nr i danego reportażu (albo grafika zastępcza) */
  function photoType(rep, i) {
    var t = rep.typy && rep.typy.length ? rep.typy : ["zapora"];
    return t[i % t.length];
  }
  function photoSrc(rep, i) {
    var z = (rep.zdjecia || [])[i];
    if (z && z.plik) {
      return /^(https?:)?\/\//.test(z.plik) || z.plik.indexOf("/") !== -1 ? z.plik : "zdjecia/" + rep.id + "/" + z.plik;
    }
    return placeholderSVG(photoType(rep, i), rep.id + "-" + i);
  }
  function coverIndex(rep) {
    var n = (rep.zdjecia || []).length;
    var k = rep.okladka || 0;
    return n ? Math.min(Math.max(k, 0), n - 1) : 0;
  }
  function imgTag(rep, i, extra) {
    var z = (rep.zdjecia || [])[i] || {};
    return '<img src="' + esc(photoSrc(rep, i)) + '" alt="' + esc(z.opis || rep.tytul) + '" data-ph-type="' + esc(photoType(rep, i)) +
      '" data-ph-seed="' + esc(rep.id + "-" + i) + '" ' + (extra || "") + ">";
  }
  // Gdy wskazany plik zdjęcia nie istnieje – pokaż grafikę zastępczą
  document.addEventListener("error", function (e) {
    var el = e.target;
    if (el && el.tagName === "IMG" && el.dataset.phType && !el.dataset.phDone) {
      el.dataset.phDone = "1";
      el.src = placeholderSVG(el.dataset.phType, el.dataset.phSeed);
    }
  }, true);

  /* ---------- Mapa (Leaflet + OpenStreetMap) ---------- */
  function createMap(el, opts) {
    if (!window.L || !el) return null;
    var map = L.map(el, Object.assign({ scrollWheelZoom: false, zoomControl: true }, opts || {}));
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    // kółko myszy przybliża dopiero po kliknięciu w mapę
    map.on("click focus", function () { map.scrollWheelZoom.enable(); });
    map.on("mouseout blur", function () { map.scrollWheelZoom.disable(); });
    return map;
  }
  function markerIcon(rep) {
    var color = typ((rep.typy || [])[0]).kolor;
    return L.divIcon({
      className: "",
      html: '<div class="pin" style="--c:' + esc(color) + '"></div>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  }
  function popupHTML(rep) {
    return '<div class="popup"><img src="' + esc(photoSrc(rep, coverIndex(rep))) + '" alt="" data-ph-type="' + esc(photoType(rep, coverIndex(rep))) +
      '" data-ph-seed="' + esc(rep.id + "-" + coverIndex(rep)) + '"><div class="popup__body"><h3>' + esc(rep.tytul) + "</h3><p>" +
      esc([rep.rzeka, fmtDate(rep.data)].filter(Boolean).join(" · ")) + '</p><a href="reportaz.html?id=' + encodeURIComponent(rep.id) +
      '">Zobacz fotoreportaż →</a></div></div>';
  }

  /* ---------- Nagłówek, menu, stopka ---------- */
  function initChrome() {
    var header = document.querySelector(".header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.innerHTML = icon(open ? "close" : "menu");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.innerHTML = icon("menu");
        }
      });
    }
    if (header) {
      var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    document.querySelectorAll("[data-icon]").forEach(function (el) { el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon)); });
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var v = CONFIG[el.dataset.config];
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // Kontakt w stopce i w sekcji „Dołącz”
    document.querySelectorAll("[data-contact]").forEach(function (el) {
      var items = [];
      if (CONFIG.email) items.push('<li><a href="mailto:' + esc(CONFIG.email) + '">' + esc(CONFIG.email) + "</a></li>");
      if (CONFIG.facebook) items.push('<li><a href="' + esc(CONFIG.facebook) + '" target="_blank" rel="noopener">Facebook</a></li>');
      if (CONFIG.instagram) items.push('<li><a href="' + esc(CONFIG.instagram) + '" target="_blank" rel="noopener">Instagram</a></li>');
      if (CONFIG.opiekun) items.push("<li>Opiekun: " + esc(CONFIG.opiekun) + "</li>");
      el.innerHTML = items.join("");
    });
    document.querySelectorAll("[data-mailto]").forEach(function (el) {
      if (CONFIG.email) el.href = "mailto:" + CONFIG.email + (el.dataset.mailto ? "?subject=" + encodeURIComponent(el.dataset.mailto) : "");
      else el.hidden = true;
    });

    // Płynne pojawianie się sekcji
    var els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  window.HT = {
    CONFIG: CONFIG, TYPY: TYPY, REPORTAZE: REPORTAZE,
    icon: icon, esc: esc, plural: plural, fmtDate: fmtDate, typ: typ, badges: badges, byDateDesc: byDateDesc, normalize: normalize,
    findReportaz: findReportaz, photoSrc: photoSrc, photoType: photoType, coverIndex: coverIndex, imgTag: imgTag,
    placeholderSVG: placeholderSVG, createMap: createMap, markerIcon: markerIcon, popupHTML: popupHTML, initChrome: initChrome
  };
})();
