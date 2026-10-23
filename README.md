# Mohammad Saif — Portfolio & Web App

A clean, responsive, and minimalist developer portfolio built with FastAPI and Jinja2 Templates, styled with a retro neobrutalist aesthetic and custom typography.

---

## Features

- **FastAPI-Powered**: Lightweight and fast backend routing using FastAPI and Jinja2 templating.
- **Retro / Neobrutalist Aesthetic**: Warm cream palette (`#ece8e2`), solid black ink borders (`#1c1c1b`), subtle offset drop shadows, and responsive grid layouts.
- **Pages & Sections**:
  - **Home (`/` or `/home`)**: Hero section featuring background introduction, headshot banner, and an accurate, responsive **Tools I Use** row (Python, PySpark, PostgreSQL, Databricks).
  - **Selected Work (`/work`)**: Project grid showcasing data engineering and automation projects with tech stack tags and direct GitHub links.
  - **About (`/about`)**: Personal summary, background, and areas of interest.
  - **Connect (`/connect`)**: Interactive contact links for LinkedIn, GitHub, and Email styled with tactile hover animations.
- **Responsive Design**: Mobile-friendly layout adapting smoothly across desktop, tablet, and mobile screen sizes.

---

## Tech Stack

- **Backend**: Python 3.14+, [FastAPI](https://fastapi.tiangolo.com/), Jinja2
- **Frontend**: HTML5, Vanilla CSS3 (Custom properties, CSS Grid & Flexbox)
- **Package & Environment Manager**: [uv](https://docs.astral.sh/uv/)
- **Fonts**: Comic Mono & Comic Neue

---

## Project Structure

```text
FastAPI-App/
├── pyproject.toml              # Project dependencies and packaging metadata
├── README.md                   # Project documentation
├── uv.lock                     # Lockfile for reproducible dependencies
└── src/
    ├── fastapi_app/
    │   ├── __init__.py
    │   ├── main.py             # FastAPI routes, data definitions, and entry point
    │   └── template/           # Jinja2 HTML templates
    │       ├── layout.html     # Base layout (header, footer, font imports)
    │       ├── home.html       # Landing page (hero + tools)
    │       ├── mywork.html     # Selected projects grid
    │       ├── about.html      # About page
    │       └── connect.html    # Social & contact links
    └── static/
        ├── style.css           # Global stylesheet
        └── photo_.png          # Profile avatar
```

---

## Getting Started

### Prerequisites

Ensure you have **Python 3.14+** and [**uv**](https://docs.astral.sh/uv/) installed:

```bash
# Install uv (if not installed)
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MohammadSaif001/FastAPI-App.git
   cd FastAPI-App
   ```

2. **Sync dependencies and create virtual environment:**
   ```bash
   uv sync
   ```

### Running the App

Start the development server with live reload:

```bash
uv run fastapi dev src/fastapi_app/main.py
```

Or using `uvicorn` directly:

```bash
uv run uvicorn fastapi_app.main:app --reload --app-dir src
```

Open your browser and navigate to:
```text
http://127.0.0.1:8000
```

---

## Routes Overview

| Route | Description |
| :--- | :--- |
| `/` or `/home` | Main landing page (hero intro, portrait, and tools) |
| `/work` | Portfolio projects grid with tech stacks and GitHub links |
| `/about` | Bio, education, and technical interests |
| `/connect` | Social links (LinkedIn, GitHub, Email) |

---

## Author

**Mohammad Saif**
- **LinkedIn**: [mohammad-saif-001](https://www.linkedin.com/in/mohammad-saif-001/)
- **GitHub**: [@MohammadSaif001](https://github.com/MohammadSaif001)
- **Email**: [mohammadsaif005421@gmail.com](mailto:mohammadsaif005421@gmail.com)
