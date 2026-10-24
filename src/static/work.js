const projects = [
    {
      id: "elt-lakehouse",
      number: "01",
      title: "ELT-LAKEHOUSE",
      category: "Data Engineering",
      description: "Synthetic commerce data into validated Delta tables.",
      overview:
        "A configurable e-commerce data engineering project that generates synthetic Olist-style datasets, ingests them with Spark, and stores them as Delta tables. The implemented pipeline covers Bronze ingestion and Silver validation.",
      problem:
        "Pipeline experiments need realistic, repeatable data and clear checks for schema drift, missing values, duplicates, and broken relationships. This project builds those inputs and checks into the workflow.",
      flow: ["Synthetic commerce data", "Bronze Delta", "Silver + quarantine"],
      features: [
        "Config-driven generation for eight related commerce datasets.",
        "Contract-based casting, business-rule checks, and referential-integrity validation.",
        "A read-only Flask dashboard for pipeline health, quality checks, storage, and logs.",
      ],
      outcomes: [
        "Bronze and Silver Delta layers are implemented.",
        "Invalid records can be isolated in quarantine tables.",
        "Kafka, Airflow, dbt, and Gold loading are present as development integrations.",
      ],
      stack: ["Python", "PySpark", "Delta Lake", "Flask"],
      visual: "lakehouse",
      links: {
        github: "https://github.com/MohammadSaif001/ELT-LAKEHOUSE",
        demo: null,
      },
    },
    {
      id: "crm-erp-pipeline",
      number: "02",
      title: "CRM & ERP ELT PIPELINE",
      category: "Data Engineering",
      description: "Six source files transformed into dimensions and a sales fact.",
      overview:
        "A Python and MySQL ELT workflow that combines six CRM and ERP CSV files into Bronze, Silver, and Gold layers. The Gold layer prepares customer and product dimensions and a sales fact table.",
      problem:
        "Customer, product, and sales records arrive from separate source systems with inconsistent formats. The pipeline makes their ingestion, cleanup, validation, and analytics preparation repeatable.",
      flow: ["CRM + ERP CSVs", "Bronze", "Silver", "Gold + dashboard"],
      features: [
        "Tracks source-file ingestion and supports repeatable pipeline runs.",
        "Checks nulls, duplicate keys, row counts, and foreign-key integrity.",
        "Includes a FastAPI operations dashboard for run health and data quality.",
      ],
      outcomes: [
        "Publishes cleaned customer and product dimensions plus a sales fact.",
        "Separates raw ingestion, standardization, and analytics preparation by layer.",
        "Uses MySQL for the Bronze, Silver, and Gold databases.",
      ],
      stack: ["Python", "MySQL", "SQL", "FastAPI"],
      visual: "warehouse",
      links: {
        github: "https://github.com/MohammadSaif001/crm-erp-elt-pipeline",
        demo: null,
      },
    },
    {
      id: "linkedin-job-scraper",
      number: "03",
      title: "LINKEDIN JOB SCRAPER",
      category: "Automation",
      description: "Paged job listings, deduplicated and ready to export.",
      overview:
        "A command-line scraper that searches publicly available LinkedIn job listings by role and location, then exports job titles, companies, locations, and application links.",
      problem:
        "Collecting listings across search pages by hand is repetitive. The tool automates browser-based collection and produces a structured file that can be reviewed or analyzed.",
      flow: ["Search query", "Playwright", "Parse + deduplicate", "CSV / JSON"],
      features: [
        "Supports search terms, locations, pagination, and result limits.",
        "Uses Playwright for rendered pages and BeautifulSoup to parse listing details.",
        "Offers headless and visible-browser modes, with CSV or JSON output.",
      ],
      outcomes: [
        "Exports structured job title, company, location, and application-link fields.",
        "Removes duplicate listings before writing output.",
        "Includes a programmatic Python entry point as well as CLI usage.",
      ],
      stack: ["Python", "Playwright", "BeautifulSoup", "CSV / JSON"],
      visual: "scraper",
      links: {
        github: "https://github.com/MohammadSaif001/linkedin_job_scraper",
        demo: null,
      },
    },
    {
      id: "instagram-auto-scroller",
      number: "04",
      title: "INSTAGRAM REEL AUTO-SCROLLER",
      category: "Browser Automation",
      description: "Persistent Chrome session with duration-aware scrolling.",
      overview:
        "A personal browser automation tool that opens Instagram Reels, reads each Reel’s duration, waits for it to finish, and then moves to the next one.",
      problem:
        "Repeatedly swiping between videos is a manual interaction. This script automates that navigation while reusing a local browser session after the first sign-in.",
      flow: ["Python script", "Selenium + Chrome", "Read duration", "Scroll next"],
      features: [
        "Reuses a persistent Chrome profile and detects an existing login.",
        "Skips common popups and opens the Reels page automatically.",
        "Can run with Docker Compose and a Selenium Chrome container.",
      ],
      outcomes: [
        "Waits for the current Reel’s duration before scrolling.",
        "Keeps browser session data in the local profile rather than source code.",
        "Includes the main entry script and archived experiments.",
      ],
      stack: ["Python", "Selenium", "Docker", "Chrome"],
      visual: "browser",
      links: {
        github: "https://github.com/MohammadSaif001/automat-Instagram-script",
        demo: null,
      },
    },
    {
      id: "loader-animation",
      number: "05",
      title: "LOADER ANIMATION SCRIPT",
      category: "Python / CLI",
      description: "Percentage-based loader with an ASCII progress bar.",
      overview:
        "A small terminal script that animates progress from 1 to 100%, fills a text progress bar, and prints an ASCII banner when done.",
      problem:
        "Long-running command-line tasks benefit from visible progress. This script demonstrates a simple animated status display in a terminal.",
      flow: ["Start", "Update percentage", "Fill progress bar", "Finish banner"],
      features: [
        "Refreshes the terminal display as progress advances.",
        "Adds a short delay between updates to animate the bar.",
        "Prints a cyan ASCII banner at completion.",
      ],
      outcomes: [
        "A reusable example of terminal progress feedback in Python.",
        "The script uses Windows `cls`; the README notes `clear` for macOS/Linux.",
      ],
      stack: ["Python", "CLI"],
      visual: "terminal",
      links: {
        github: "https://github.com/MohammadSaif001/Loader-Animation-Script",
        demo: null,
      },
    },
  ];
  
  const explorer = document.querySelector("#work-explorer");
  const projectGrid = document.querySelector("#project-grid");
  const detailPanel = document.querySelector("#project-detail-panel");
  const announcement = document.querySelector("#project-selection-announcement");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const flipDuration = 640;
  const flipEasing = "cubic-bezier(0.22, 1, 0.36, 1)";
  let activeProject = null;
  let activeTileButton = null;
  let detailSwapTimer;
  let closeTimer;
  
  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  
  function addList(parent, items, className) {
    const list = node("ul", className);
    for (const item of items) list.append(node("li", "", item));
    parent.append(list);
  }
  
  function createTile(project) {
    const card = node("article", `project-card project-card--${project.visual}`);
    card.dataset.project = project.id;
  
    const tile = node("div", "project-tile");
    const heading = node("div", "project-tile-heading");
    heading.append(node("span", "project-number", project.number));
  
    const titleGroup = node("div", "project-title-group");
    titleGroup.append(node("span", "project-category", project.category));
    titleGroup.append(node("h2", "project-name", project.title));
    heading.append(titleGroup);
    tile.append(heading);
    tile.append(node("p", "project-highlight", project.description));
    addList(tile, project.stack, "project-stack");
  
    const moreInfo = node("button", "project-toggle");
    moreInfo.type = "button";
    moreInfo.dataset.project = project.id;
    moreInfo.setAttribute("aria-expanded", "false");
    moreInfo.setAttribute("aria-controls", "project-detail-panel");
    moreInfo.append(node("span", "", "More info"));
    moreInfo.append(node("span", "project-toggle-icon", "→"));
    moreInfo.lastElementChild.setAttribute("aria-hidden", "true");
    tile.append(moreInfo);
    card.append(tile);
    return card;
  }
  
  function makeLink(label, href, className) {
    if (!href) return null;
    const link = node("a", className);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(node("span", "", label));
    if (className === "project-link") link.append(node("span", "", "↗"));
    return link;
  }
  
  function createSection(icon, title, content) {
    const section = node("section", "detail-section");
    const heading = node("h3");
    const symbol = node("span", "", icon);
    symbol.setAttribute("aria-hidden", "true");
    heading.append(symbol, document.createTextNode(` ${title}`));
    section.append(heading, content);
    return section;
  }
  
  function createDiagram(project) {
    const diagram = window.ProjectDiagrams?.render(project.visual);
    if (!diagram) return null;
  
    const figure = node("figure", `detail-diagram detail-diagram--${project.visual}`);
    figure.setAttribute("role", "img");
    figure.setAttribute("aria-label", `${project.title} diagram: ${project.flow.join(", then ")}.`);
    const scroller = node("div", "detail-diagram-scroll");
    scroller.innerHTML = diagram.svg; // static, trusted markup from diagrams.js
    figure.append(scroller, node("figcaption", "", diagram.note));
    if (project.visual === "terminal") window.ProjectDiagrams.startTerminalDemo(figure);
    return figure;
  }
  
  function createDetail(project) {
    const detail = node("article", "project-detail-content");
    detail.setAttribute("aria-labelledby", "project-detail-heading");
  
    const header = node("header", "project-detail-heading");
    const headingCopy = node("div");
    headingCopy.append(
      node("p", "eyebrow", `PROJECT ${project.number} · ${project.category}`),
      node("h2", "", project.title),
      node("p", "project-description", project.description),
    );
    headingCopy.querySelector("h2").id = "project-detail-heading";
  
    const actions = node("div", "project-detail-actions");
    const close = node("button", "project-detail-close");
    close.type = "button";
    close.setAttribute("aria-label", "Close project details");
    close.append(node("span", "", "Close"), node("span", "", "×"));
    close.lastElementChild.setAttribute("aria-hidden", "true");
    actions.append(close);
    const github = makeLink("GitHub", project.links.github, "project-link");
    if (github) actions.append(github);
    const demo = makeLink("Live demo", project.links.demo, "project-link");
    if (demo) actions.append(demo);
    header.append(headingCopy, actions);
  
    const columns = node("div", "project-detail-grid");
    const left = node("div", "project-detail-column");
    left.append(
      createSection("✳", "Overview", node("p", "", project.overview)),
      createSection("◎", "Problem explored", node("p", "", project.problem)),
    );
    const features = node("ul", "detail-bullet-list");
    for (const item of project.features) features.append(node("li", "", item));
    left.append(createSection("⚙", "Key features", features));
  
    const right = node("div", "project-detail-column");
    const tech = node("ul", "detail-tech-list");
    for (const item of project.stack) tech.append(node("li", "", item));
    right.append(createSection("▱", "Tech stack", tech));
    const outcomes = node("ul", "detail-bullet-list");
    for (const item of project.outcomes) outcomes.append(node("li", "", item));
    const outcomeSection = createSection("▥", "What it delivers", outcomes);
    outcomeSection.classList.add("detail-outcomes");
    right.append(outcomeSection);
  
    columns.append(left, right);
    const figure = createDiagram(project);
    if (figure) {
      const diagramSection = createSection("♧", "How it works", figure);
      diagramSection.classList.add("detail-diagram-section");
      detail.append(header, diagramSection, columns);
    } else {
      detail.append(header, columns);
    }
    return detail;
  }
  
  function renderTiles() {
    const fragment = document.createDocumentFragment();
    for (const project of projects) fragment.append(createTile(project));
    projectGrid.replaceChildren(fragment);
    document.querySelectorAll("[data-project-count]").forEach((count) => {
      count.textContent = String(projects.length);
    });
  }
  
  function cardPositions() {
    return [...projectGrid.querySelectorAll(".project-card")].map((card) => ({
      card,
      rect: card.getBoundingClientRect(),
    }));
  }
  
  function playFlip(firstPositions) {
    if (reducedMotion.matches) return;
  
    firstPositions.forEach(({ card, rect: first }, index) => {
      const last = card.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = last.width ? first.width / last.width : 1;
      const sy = last.height ? first.height / last.height : 1;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) return;
  
      card.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
          { transform: "translate(0, 0) scale(1, 1)" },
        ],
        {
          duration: flipDuration,
          delay: index * 45,
          easing: flipEasing,
        },
      );
    });
  }
  
  function setActiveProject(project, button) {
    projectGrid.querySelectorAll(".project-toggle").forEach((toggle) => {
      const selected = toggle === button;
      toggle.setAttribute("aria-expanded", String(selected));
      toggle.closest(".project-card").classList.toggle("is-selected", selected);
    });
    activeProject = project;
    activeTileButton = button;
  }
  
  function openProject(project, button) {
    window.clearTimeout(closeTimer);
    if (activeProject?.id === project.id) return;
  
    if (explorer.classList.contains("is-open")) {
      setActiveProject(project, button);
      announcement.textContent = `${project.title} details`;
      detailPanel.classList.add("is-content-swapping");
      window.clearTimeout(detailSwapTimer);
      detailSwapTimer = window.setTimeout(() => {
        detailPanel.replaceChildren(createDetail(project));
        detailPanel.classList.remove("is-content-swapping");
      }, 120);
      return;
    }
  
    const firstPositions = cardPositions();
    setActiveProject(project, button);
    announcement.textContent = `${project.title} details opened`;
    detailPanel.replaceChildren(createDetail(project));
    detailPanel.hidden = false;
    detailPanel.inert = false;
    detailPanel.setAttribute("aria-hidden", "false");
    detailPanel.classList.add("is-entering");
    explorer.classList.add("is-open");
    if (window.matchMedia("(max-width: 900px)").matches) {
      projectGrid.inert = true;
      document.body.classList.add("project-detail-open");
    }
    void detailPanel.offsetWidth;
    playFlip(firstPositions);
    requestAnimationFrame(() => {
      detailPanel.classList.remove("is-entering");
      detailPanel.focus({ preventScroll: true });
    });
  }
  
  function closeProject() {
    if (!explorer.classList.contains("is-open")) return;
  
    const firstPositions = cardPositions();
    const returnFocusTo = activeTileButton;
    projectGrid.inert = true;
    setActiveProject(null, null);
    announcement.textContent = "Project details closed";
    explorer.classList.remove("is-open");
    explorer.classList.add("is-closing");
    void projectGrid.offsetWidth;
    playFlip(firstPositions);
  
    if (reducedMotion.matches) {
      finishClose(returnFocusTo);
      return;
    }
  
    closeTimer = window.setTimeout(() => finishClose(returnFocusTo), 580);
  }
  
  function finishClose(returnFocusTo) {
    detailPanel.hidden = true;
    detailPanel.inert = true;
    detailPanel.setAttribute("aria-hidden", "true");
    detailPanel.classList.remove("is-entering", "is-content-swapping", "is-switching");
    explorer.classList.remove("is-closing");
    document.body.classList.remove("project-detail-open");
    projectGrid.inert = false;
    activeProject = null;
    activeTileButton = null;
    returnFocusTo?.focus({ preventScroll: true });
  }
  
  renderTiles();
  
  projectGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".project-toggle");
    if (!button) return;
    const project = projects.find((item) => item.id === button.dataset.project);
    if (project) openProject(project, button);
  });
  
  detailPanel.addEventListener("click", (event) => {
    if (event.target.closest(".project-detail-close")) closeProject();
  });
  
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProject();
  });
  
