(function () {
  "use strict";

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  /* Multi-line <text>; "\n" in the string starts a new line. */
  function text(cls, x, y, content, anchor = "middle", lh = 13) {
    const lines = String(content).split("\n");
    return (
      `<text class="${cls}" text-anchor="${anchor}">` +
      lines
        .map((line, i) => `<tspan x="${x}" y="${y + i * lh}">${esc(line)}</tspan>`)
        .join("") +
      `</text>`
    );
  }

  /* A node: hard offset shadow, bordered box, centred title and optional sub-label. */
  function box({ x, y, w, h, title, sub, tone = "surface", i = 0, ghost = false, stack = false }) {
    const titleLines = String(title).split("\n").length;
    const subLines = sub ? String(sub).split("\n").length : 0;
    const total = titleLines * 14 + (subLines ? subLines * 12 + 3 : 0);
    const top = y + (h - total) / 2;
    const cx = x + w / 2;
    let out = `<g class="dg-node${ghost ? " dg-ghost" : ""}" style="--i:${i}">`;
    if (stack) {
      out += `<rect class="dg-box dg-surface" x="${x + 12}" y="${y - 8}" width="${w}" height="${h}"/>`;
      out += `<rect class="dg-box dg-surface" x="${x + 6}" y="${y - 4}" width="${w}" height="${h}"/>`;
    }
    if (!ghost) out += `<rect class="dg-shadow" x="${x + 4}" y="${y + 4}" width="${w}" height="${h}"/>`;
    out += `<rect class="dg-box dg-${tone}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
    out += text("dg-title", cx, top + 11, title, "middle", 14);
    if (sub) out += text("dg-sub", cx, top + titleLines * 14 + 12, sub, "middle", 12);
    return out + `</g>`;
  }

  /* An arrow. Default = animated data flow; ref = static dotted (read-only / optional). */
  function edge(d, { ref = false, i = 0, arrow = true } = {}) {
    return (
      `<path class="dg-edge ${ref ? "is-ref" : "is-flow"}" d="${d}"` +
      `${arrow ? ' marker-end="url(#dg-arrow)"' : ""} style="--i:${i}"/>`
    );
  }

  const defs =
    `<defs>` +
    `<marker id="dg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">` +
    `<path d="M0 1 L9 5 L0 9 z" fill="#1c1c1b"/></marker>` +
    `<pattern id="dg-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">` +
    `<rect width="7" height="7" fill="#f3d3c9"/><line x1="0" y1="0" x2="0" y2="7" stroke="#dca596" stroke-width="2"/></pattern>` +
    `</defs>`;

  const wrap = (w, h, inner) =>
    `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${defs}${inner}</svg>`;

  const legend = (x, y) =>
    `<g class="dg-node" style="--i:0">` +
    `<rect class="dg-box dg-mint" x="${x}" y="${y}" width="16" height="11"/>` +
    text("dg-note", x + 24, y + 9, "implemented", "start") +
    `<rect class="dg-box dg-ghost-swatch" x="${x}" y="${y + 20}" width="16" height="11"/>` +
    text("dg-note", x + 24, y + 29, "in development", "start") +
    `</g>`;

  /* ---------- 01 · ELT-Lakehouse: medallion flow with a validation gate ---------- */
  function lakehouse() {
    const nodes = [
      legend(8, 14),
      box({ x: 8, y: 120, w: 104, h: 56, title: "Generator", sub: "config-driven", tone: "mint", i: 1 }),
      box({ x: 140, y: 112, w: 100, h: 72, title: "8 datasets", sub: "Olist-style", stack: true, i: 2 }),
      box({ x: 288, y: 120, w: 96, h: 56, title: "Spark", sub: "ingest", i: 3 }),
      box({ x: 420, y: 112, w: 104, h: 72, title: "Bronze", sub: "raw Delta", tone: "bronze", i: 4 }),
      `<g class="dg-node" style="--i:5">` +
        `<polygon class="dg-shadow" points="591,112 631,152 591,192 551,152"/>` +
        `<polygon class="dg-box dg-mint" points="587,108 627,148 587,188 547,148"/>` +
        text("dg-title", 587, 152, "Check") +
        text("dg-sub", 587, 98, "schema · rules · keys") +
        `</g>`,
      box({ x: 650, y: 112, w: 104, h: 72, title: "Silver", sub: "validated Delta", tone: "silver", i: 6 }),
      box({ x: 537, y: 252, w: 100, h: 48, title: "Quarantine", sub: "invalid rows", tone: "warn", i: 7 }),
      box({ x: 650, y: 252, w: 104, h: 48, title: "Gold + dbt", sub: "dev integration", ghost: true, i: 8 }),
      box({ x: 268, y: 252, w: 136, h: 48, title: "Kafka · Airflow", sub: "dev integrations", ghost: true, i: 8 }),
      box({
        x: 420, y: 14, w: 334, h: 48, title: "Flask dashboard",
        sub: "read-only · health · checks · storage · logs", tone: "green", i: 9,
      }),
      text("dg-note", 597, 226, "fail", "start"),
    ];
    const edges = [
      edge("M112 148 H140", { i: 2 }),
      edge("M252 148 H288", { i: 3 }),
      edge("M384 148 H420", { i: 4 }),
      edge("M524 148 H547", { i: 5 }),
      edge("M627 148 H650", { i: 6 }),
      edge("M587 188 V252", { i: 7 }),
      edge("M702 184 V252", { ref: true, i: 8 }),
      edge("M336 252 V176", { ref: true, i: 8 }),
      edge("M472 62 V112", { ref: true, i: 9 }),
      edge("M702 62 V112", { ref: true, i: 9 }),
    ];
    return wrap(760, 316, nodes.join("") + edges.join(""));
  }

  /* ---------- 02 · CRM & ERP: two sources → medallion layers → star schema ---------- */
  function warehouse() {
    const cluster = (y, name, i) => {
      let s =
        `<g class="dg-node" style="--i:${i}">` +
        `<rect class="dg-shadow" x="12" y="${y + 4}" width="120" height="112"/>` +
        `<rect class="dg-box dg-surface" x="8" y="${y}" width="120" height="112"/>` +
        text("dg-title", 20, y + 20, name, "start");
      [0, 1, 2].forEach((k) => {
        const cy = y + 30 + k * 26;
        s += `<rect class="dg-chip" x="20" y="${cy}" width="96" height="20"/>` + text("dg-note", 68, cy + 14, "CSV");
      });
      return s + `</g>`;
    };
    const nodes = [
      text("dg-note dg-note-strong", 190, 56, "BRONZE → SILVER → GOLD", "start"),
      text("dg-note", 190, 72, "each layer is its own MySQL database", "start"),
      cluster(40, "CRM", 0),
      cluster(190, "ERP", 0),
      box({ x: 190, y: 121, w: 96, h: 100, title: "Bronze", sub: "raw load\nMySQL", tone: "bronze", i: 2 }),
      box({ x: 330, y: 121, w: 96, h: 100, title: "Silver", sub: "clean +\nstandardize", tone: "silver", i: 3 }),
      `<g class="dg-node" style="--i:4">` +
        `<rect class="dg-frame" x="470" y="24" width="160" height="292"/>` +
        text("dg-note dg-note-strong", 482, 42, "GOLD · STAR SCHEMA", "start") +
        `</g>`,
      box({ x: 490, y: 56, w: 120, h: 48, title: "Customer dim", tone: "mint", i: 5 }),
      box({ x: 490, y: 139, w: 120, h: 64, title: "Sales fact", tone: "green", i: 5 }),
      box({ x: 490, y: 238, w: 120, h: 48, title: "Product dim", tone: "mint", i: 5 }),
      box({ x: 650, y: 131, w: 100, h: 80, title: "FastAPI", sub: "ops dashboard\nrun health +\nquality", tone: "green", i: 6 }),
      box({ x: 190, y: 262, w: 236, h: 44, title: "Quality checks", sub: "nulls · dupes · row counts · FKs", tone: "mint", i: 6 }),
    ];
    const edges = [
      edge("M128 96 H160 V150 H190", { i: 2 }),
      edge("M128 246 H160 V192 H190", { i: 2 }),
      edge("M286 171 H330", { i: 3 }),
      edge("M426 171 H490", { i: 4 }),
      edge("M550 104 V139", { i: 5 }),
      edge("M550 238 V203", { i: 5 }),
      edge("M630 171 H650", { ref: true, i: 6 }),
      edge("M238 262 V221", { ref: true, i: 6 }),
      edge("M378 262 V221", { ref: true, i: 6 }),
    ];
    return wrap(760, 316, nodes.join("") + edges.join(""));
  }

  /* ---------- 03 · LinkedIn scraper: browser window, pagination loop, dedupe, export ---------- */
  function scraper() {
    const file = (x, y, label, i) =>
      `<g class="dg-node" style="--i:${i}">` +
      `<path class="dg-shadow" d="M${x + 4} ${y + 4} H${x + 52} L${x + 66} ${y + 18} V${y + 68} H${x + 4} Z"/>` +
      `<path class="dg-box dg-mint" d="M${x} ${y} H${x + 48} L${x + 62} ${y + 14} V${y + 64} H${x} Z"/>` +
      `<path class="dg-fold" d="M${x + 48} ${y} V${y + 14} H${x + 62}"/>` +
      text("dg-title", x + 31, y + 44, label) +
      `</g>`;
    const rows = [0, 1, 2, 3]
      .map((k) => {
        const ry = 106 + k * 30;
        return (
          `<rect class="dg-chip" x="184" y="${ry}" width="152" height="24"/>` +
          `<rect class="dg-pip" x="190" y="${ry + 6}" width="12" height="12"/>` +
          `<rect class="dg-line" x="210" y="${ry + 6}" width="96" height="4"/>` +
          `<rect class="dg-line" x="210" y="${ry + 14}" width="62" height="3"/>`
        );
      })
      .join("");
    const browser =
      `<g class="dg-node" style="--i:2">` +
      `<rect class="dg-shadow" x="174" y="74" width="180" height="170"/>` +
      `<rect class="dg-box dg-surface" x="170" y="70" width="180" height="170"/>` +
      `<rect class="dg-titlebar" x="170" y="70" width="180" height="26"/>` +
      `<circle class="dg-dot" cx="184" cy="83" r="3.5"/><circle class="dg-dot" cx="197" cy="83" r="3.5"/><circle class="dg-dot" cx="210" cy="83" r="3.5"/>` +
      `<rect class="dg-chip" x="224" y="77" width="116" height="12"/>` +
      text("dg-micro", 282, 86, "linkedin.com/jobs") +
      rows +
      `<rect class="dg-scan" x="180" y="104" width="160" height="28"/>` +
      text("dg-sub", 260, 233, "rendered search pages") +
      `</g>`;
    const nodes = [
      box({ x: 8, y: 118, w: 120, h: 84, title: "CLI", sub: "role · location\npages · limit", tone: "mint", i: 1 }),
      browser,
      text("dg-title", 260, 20, "next page"),
      box({ x: 400, y: 118, w: 100, h: 84, title: "Parse", sub: "BeautifulSoup", i: 3 }),
      text("dg-note", 450, 226, "title · company", "middle"),
      text("dg-note", 450, 240, "location · link", "middle"),
      box({ x: 548, y: 118, w: 96, h: 84, title: "Deduplicate", sub: "unique\nlistings", tone: "silver", i: 4 }),
      text("dg-note", 596, 264, "duplicates\ndropped", "middle", 12),
      file(690, 88, "CSV", 5),
      file(690, 168, "JSON", 5),
      box({ x: 8, y: 240, w: 112, h: 44, title: "Python API", sub: "programmatic", ghost: true, i: 6 }),
      text("dg-sub", 260, 264, "headless or visible mode"),
    ];
    const edges = [
      edge("M128 160 H170", { i: 2 }),
      edge("M330 70 C330 20 190 20 190 70", { i: 2 }),
      edge("M350 160 H400", { i: 3 }),
      edge("M500 160 H548", { i: 4 }),
      edge("M596 202 V246", { ref: true, i: 4 }),
      edge("M644 160 H664 V120 H690", { i: 5 }),
      edge("M644 160 H664 V200 H690", { i: 5 }),
      edge("M64 240 V202", { ref: true, i: 6 }),
    ];
    return wrap(760, 300, nodes.join("") + edges.join(""));
  }

  /* ---------- 04 · Instagram Reel auto-scroller: a timed loop inside Selenium + Chrome ---------- */
  function browser() {
    const cx = 400, cy = 170, r = 110;
    const pt = (a) => {
      const t = (a * Math.PI) / 180;
      return [(cx + r * Math.cos(t)).toFixed(1), (cy + r * Math.sin(t)).toFixed(1)];
    };
    const arc = (a1, a2) => {
      const [x1, y1] = pt(a1);
      const [x2, y2] = pt(a2);
      return `M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`;
    };
    const cylinder =
      `<g class="dg-node" style="--i:1">` +
      `<path class="dg-shadow" d="M14 226 v48 a58 9 0 0 0 116 0 v-48 z"/>` +
      `<path class="dg-box dg-silver" d="M10 222 v48 a58 9 0 0 0 116 0 v-48"/>` +
      `<ellipse class="dg-box dg-mint" cx="68" cy="222" rx="58" ry="9"/>` +
      text("dg-title", 68, 247, "Chrome\nprofile", "middle", 14) +
      text("dg-sub", 68, 296, "login reused") +
      `</g>`;
    const clock =
      `<g class="dg-node" style="--i:5">` +
      `<circle class="dg-box dg-surface" cx="400" cy="160" r="28"/>` +
      `<line class="dg-tick" x1="400" y1="136" x2="400" y2="141"/>` +
      `<line class="dg-tick" x1="400" y1="179" x2="400" y2="184"/>` +
      `<line class="dg-tick" x1="376" y1="160" x2="381" y2="160"/>` +
      `<line class="dg-tick" x1="419" y1="160" x2="424" y2="160"/>` +
      `<line class="dg-hand dg-hand-short" x1="400" y1="160" x2="411" y2="160"/>` +
      `<line class="dg-hand dg-hand-long" x1="400" y1="160" x2="400" y2="142" style="transform-origin:400px 160px"/>` +
      `<circle class="dg-pivot" cx="400" cy="160" r="2.5"/>` +
      text("dg-sub", 400, 208, "wait = reel length") +
      `</g>`;
    const nodes = [
      box({ x: 10, y: 34, w: 116, h: 52, title: "Python script", sub: "entry point", tone: "mint", i: 0 }),
      cylinder,
      `<g class="dg-node" style="--i:2">` +
        `<rect class="dg-frame" x="215" y="14" width="370" height="312"/>` +
        text("dg-note dg-note-strong", 227, 32, "SELENIUM + CHROME", "start") +
        `</g>`,
      box({ x: 348, y: 38, w: 104, h: 44, title: "Open Reels", tone: "mint", i: 3 }),
      box({ x: 458, y: 148, w: 104, h: 44, title: "Read\nduration", i: 3 }),
      box({ x: 348, y: 258, w: 104, h: 44, title: "Wait for\nreel to end", tone: "silver", i: 4 }),
      box({ x: 238, y: 148, w: 104, h: 44, title: "Scroll\nto next", i: 4 }),
      text("dg-note", 462, 54, "skips popups,\nopens Reels page", "start", 12),
      clock,
      box({ x: 630, y: 110, w: 120, h: 120, title: "Docker\nCompose", sub: "optional\nSelenium Chrome\ncontainer", ghost: true, i: 6 }),
    ];
    const edges = [
      edge("M126 60 H348", { i: 2 }),
      edge("M126 246 H215", { ref: true, i: 2 }),
      edge(arc(-62, -11.5), { i: 3 }),
      edge(arc(11.5, 62), { i: 4 }),
      edge(arc(118, 168.5), { i: 4 }),
      edge(arc(191.5, 242), { i: 5 }),
      edge("M585 170 H630", { ref: true, i: 6 }),
    ];
    return wrap(760, 330, nodes.join("") + edges.join(""));
  }

  /* ---------- 05 · Loader animation: live terminal replay + the loop behind it ---------- */
  const BANNER = String.raw` ____   ___  _   _ _____
|  _ \ / _ \| \ | | ____|
| | | | | | |  \| |  _|
| |_| | |_| | |\  | |___
|____/ \___/|_| \_|_____|`.split("\n");

  function terminal() {
    const bannerLines = BANNER.map(
      (line, k) => `<tspan x="30" y="${172 + k * 14}">${esc(line)}</tspan>`
    ).join("");
    const term =
      `<g class="dg-node" style="--i:0">` +
      `<rect class="dg-shadow" x="14" y="24" width="380" height="270"/>` +
      `<rect class="dg-box dg-term-bg" x="10" y="20" width="380" height="270"/>` +
      `<rect class="dg-titlebar dg-titlebar-green" x="10" y="20" width="380" height="26"/>` +
      `<circle class="dg-dot" cx="26" cy="33" r="3.5"/><circle class="dg-dot" cx="39" cy="33" r="3.5"/><circle class="dg-dot" cx="52" cy="33" r="3.5"/>` +
      text("dg-sub dg-sub-dark", 200, 37, "terminal") +
      `<text class="dg-term-text" x="30" y="76">Loading...</text>` +
      `<rect class="dg-term-track" x="30" y="90" width="340" height="22"/>` +
      `<rect class="dg-term-fill" x="30" y="90" width="0" height="22"/>` +
      `<text class="dg-term-pct" x="370" y="146" text-anchor="end">0%</text>` +
      `<text class="dg-term-banner" xml:space="preserve" style="white-space:pre">${bannerLines}</text>` +
      `<text class="dg-term-text dg-cursor" x="30" y="276">$ _</text>` +
      `</g>`;
    const nodes = [
      term,
      box({ x: 530, y: 8, w: 130, h: 36, title: "Start", tone: "mint", i: 1 }),
      `<g class="dg-node" style="--i:2">` +
        `<rect class="dg-frame" x="440" y="70" width="310" height="150"/>` +
        text("dg-note dg-note-strong", 452, 88, "FOR EACH 1 … 100 %", "start") +
        `</g>`,
      box({ x: 455, y: 110, w: 80, h: 44, title: "Clear\nscreen", i: 3 }),
      box({ x: 559, y: 110, w: 80, h: 44, title: "Fill\nbar", tone: "mint", i: 3 }),
      box({ x: 663, y: 110, w: 80, h: 44, title: "Short\ndelay", i: 3 }),
      text("dg-note", 599, 188, "repeat until 100%"),
      box({ x: 530, y: 250, w: 130, h: 44, title: "ASCII banner", sub: "cyan, at 100%", tone: "silver", i: 4 }),
      text("dg-micro dg-micro-left", 440, 314, "clear: cls on Windows · clear on macOS/Linux", "start"),
    ];
    const edges = [
      edge("M595 44 V70", { i: 2 }),
      edge("M535 132 H559", { i: 3 }),
      edge("M639 132 H663", { i: 3 }),
      edge("M703 154 V196 H495 V154", { i: 3 }),
      edge("M595 220 V250", { i: 4 }),
    ];
    return wrap(760, 320, nodes.join("") + edges.join(""));
  }

  const registry = {
    lakehouse: {
      svg: lakehouse,
      note: "Synthetic data moves through Bronze and validated Silver.",
    },
    warehouse: {
      svg: warehouse,
      note: "CRM and ERP sources become a Gold star schema.",
    },
    scraper: {
      svg: scraper,
      note: "Search, parse, deduplicate, then export listings.",
    },
    browser: {
      svg: browser,
      note: "Each Reel is timed before the browser scrolls again.",
    },
    terminal: {
      svg: terminal,
      note: "The progress bar fills before the completion banner appears.",
    },
  };

  /* Drives the animated terminal in diagram 05 (percent 0→100, bar fill, banner). */
  function startTerminalDemo(root) {
    const fill = root.querySelector(".dg-term-fill");
    const pct = root.querySelector(".dg-term-pct");
    const banner = root.querySelector(".dg-term-banner");
    if (!fill || !pct || !banner) return;
    const show = (p) => {
      fill.setAttribute("width", ((340 * p) / 100).toFixed(1));
      pct.textContent = `${p}%`;
      banner.style.opacity = p >= 100 ? "1" : "0";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show(100);
      return;
    }
    let p = 0;
    let hold = 0;
    let seen = false;
    const born = Date.now();
    show(0);
    const timer = window.setInterval(() => {
      if (root.isConnected) seen = true;
      else if (seen || Date.now() - born > 2000) {
        window.clearInterval(timer);
        return;
      }
      if (p < 100) {
        p += 1;
        show(p);
      } else if (++hold > 45) {
        p = 0;
        hold = 0;
        show(0);
      }
    }, 45);
  }

  window.ProjectDiagrams = {
    render(visual) {
      const entry = registry[visual];
      return entry ? { svg: entry.svg(), note: entry.note } : null;
    },
    startTerminalDemo,
  };
})();
