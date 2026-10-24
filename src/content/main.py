from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .content import about, connect

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parents[1] / "static"),
    name="static",
)

templates = Jinja2Templates(directory=Path(__file__).parent / "templates")

@app.get("/", include_in_schema=False)
@app.get("/home", include_in_schema=False)
def home(request: Request) -> str:
    return templates.TemplateResponse(
        request,
        "home.html",
        {
            "title": "Data Engineer Portfolio",
            "description": "Mohammad Saif, a final-year CSE student building ELT pipelines with Python, PySpark, Delta Lake and MySQL.",
        },
    )


@app.get("/about")
def get_about(request: Request) -> str:
    return templates.TemplateResponse(
        request,
        "about.html",
        {
            "about": about,
            "title": "About Me",
            "description": "Final-year CSE student at Integral University, Lucknow, focused on data engineering.",
        },
    )


@app.get("/work")
def get_work(request: Request) -> str:
    return templates.TemplateResponse(
        request,
        "work.html",
        {
            "title": "My Work",
            "description": "Data engineering projects: a Delta Lake ELT lakehouse, a CRM and ERP pipeline, and automation tools.",
        },
    )


@app.get("/connect")
def get_connect(request: Request) -> str:
    return templates.TemplateResponse(
        request,
        "connect.html",
        {
            "connect": connect,
            "title": "Connect with Me",
            "description": "Contact Mohammad Saif on LinkedIn, GitHub or email. Open to data engineering opportunities.",
        },
    )
