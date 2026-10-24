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
        {"title": "Data Engineer Portfolio"},
    )


@app.get("/about")
def get_about(request: Request) -> str:
    return templates.TemplateResponse(
        request,
        "about.html",
        {
            "about": about,
            "title": "About Me",
        },
    )


@app.get("/work")
def get_work(request: Request) -> str:
    return templates.TemplateResponse(
        request,
        "work.html",
        {"title": "My Work"},
    )


@app.get("/connect")
def get_connect(request: Request) -> str:
    return templates.TemplateResponse(
        request,
        "connect.html",
        {
            "connect": connect,
            "title": "Connect with Me",
        },
    )
