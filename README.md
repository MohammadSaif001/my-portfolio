# Mohammad Saif — Portfolio

A responsive personal portfolio built with FastAPI, Jinja2, and plain CSS and JavaScript. It includes an introduction, project showcase, about page, and contact links.

## Requirements

- Python 3.14 or newer
- [uv](https://docs.astral.sh/uv/)

## Run locally

Install the locked dependencies and start the development server:

```bash
uv sync
uv run fastapi dev src/fastapi_app/main.py
```

Open <http://127.0.0.1:8000>.

You can also start the app with Uvicorn:

```bash
uv run uvicorn fastapi_app.main:app --reload --app-dir src
```

## Pages

| Path | Page |
| --- | --- |
| `/` and `/home` | Home and introduction |
| `/work` | Selected projects |
| `/about` | Background and interests |
| `/connect` | Contact and social links |

## Project structure

```text
.
├── pyproject.toml
├── uv.lock
├── README.md
└── src/
    ├── fastapi_app/
    │   ├── __init__.py       # Package initializer
    │   ├── main.py           # FastAPI app, routes, and static/template setup
    │   ├── content.py        # About and contact page data
    │   └── templates/        # Jinja2 page templates
    │       ├── layout.html
    │       ├── home.html
    │       ├── work.html
    │       ├── about.html
    │       └── connect.html
    └── static/               # CSS, JavaScript, and image assets
        ├── style.css
        ├── work.js
        ├── diagrams.js
        ├── images/
        ├── i.jpeg
        └── me.png
```

The app serves static assets from `/static`. Shared page layout and navigation live in `templates/layout.html`; page-specific markup lives in the other templates.

## Tests

There is no automated test suite in the repository yet. For a quick manual check, start the server and open each path in the Pages table.

## Contact

- [LinkedIn](https://www.linkedin.com/in/mohammadsaif0655/)
- [GitHub](https://github.com/MohammadSaif001)
- [Email](mailto:mohammadsaif005421@gmail.com)
