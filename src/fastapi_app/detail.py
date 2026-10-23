from typing import Any


projects: list[dict[str, Any]] = [
    {
        "number": "01",
        "name": "ELT-LAKEHOUSE",
        "category": "Data Engineering",
        "description": (
            "A PySpark and Delta Lake pipeline for generating synthetic "
            "e-commerce data and moving it through Bronze and Silver layers. "
            "It adds contract-based schema casting, validation, quarantine "
            "tables, and a read-only monitoring dashboard."
        ),
        "stack": [
            "Python",
            "PySpark",
            "Delta Lake",
            "Flask",
        ],
        "github": "https://github.com/MohammadSaif001/ELT-LAKEHOUSE",
        "featured": True,
        "image": "/static/projects/elt-lakehouse.png",
    },
    {
        "number": "02",
        "name": "CRM & ERP ELT PIPELINE",
        "category": "Data Engineering",
        "description": (
            "A Python and MySQL pipeline that combines CRM and ERP CSV data "
            "through Bronze, Silver, and Gold layers. It builds customer and "
            "product dimensions plus a sales fact table, with quality checks "
            "and a FastAPI operations dashboard."
        ),
        "stack": [
            "Python",
            "MySQL",
            "SQL",
            "FastAPI",
        ],
        "github": "https://github.com/MohammadSaif001/crm-erp-elt-pipeline",
        "featured": True,
        "image": "/static/projects/data-engineer-project.png",
    },
    {
        "number": "03",
        "name": "LINKEDIN JOB SCRAPER",
        "category": "Automation",
        "description": (
            "A Python job search scraper built with Playwright and "
            "BeautifulSoup. It handles pagination, removes duplicate "
            "listings, and exports job details and application links to "
            "CSV or JSON."
        ),
        "stack": [
            "Python",
            "Playwright",
            "BeautifulSoup",
            "CSV / JSON",
        ],
        "github": "https://github.com/MohammadSaif001/linkedin_job_scraper",
        "featured": True,
        "image": "/static/projects/linkedin-job-scraper.png",
    },
    {
        "number": "04",
        "name": "INSTAGRAM REEL AUTO-SCROLLER",
        "category": "Browser Automation",
        "description": (
            "A Selenium tool for hands-free Instagram Reels browsing, with "
            "persistent Chrome sessions, login detection, duration-aware "
            "scrolling, popup handling, and Docker support."
        ),
        "stack": [
            "Python",
            "Selenium",
            "Docker",
            "Chrome",
        ],
        "github": "https://github.com/MohammadSaif001/automat-Instagram-script",
        "featured": False,
        "image": "/static/projects/instagram-auto-scroller.png",
    },
    {
        "number": "05",
        "name": "PYSPARK SQLALCHEMY DEMO",
        "category": "Data Engineering",
        "description": (
            "A practical experiment exploring PySpark JDBC reads alongside "
            "SQLAlchemy and SQLite database operations."
        ),
        "stack": [
            "Python",
            "PySpark",
            "SQLAlchemy",
            "SQLite",
        ],
        "github": "https://github.com/MohammadSaif001/pySpark_sqlalchemy_demo",
        "featured": False,
        "image": "/static/projects/pyspark-sqlalchemy.png",
    },
    {
        "number": "06",
        "name": "LOADER ANIMATION SCRIPT",
        "category": "Python / CLI",
        "description": (
            "A small terminal utility that displays a percentage-based "
            "loading animation with a dynamic progress bar and ASCII output."
        ),
        "stack": [
            "Python",
            "CLI",
        ],
        "github": "https://github.com/MohammadSaif001/Loader-Animation-Script",
        "featured": False,
        "image": "/static/projects/loader-animation.png",
    },
]

about: list[str] = [
    (
        "Hi, I’m Mohammad Saif, a Computer Science and Engineering "
        "student at Integral University in Lucknow, focused on learning "
        "how reliable data systems are designed and built."
    ),
    (
        "My current work revolves around data engineering — building "
        "ELT pipelines, working with Python and SQL, processing data with "
        "PySpark, and exploring systems such as Delta Lake and MySQL."
    ),
    (
        "I learn by building. Each project is an opportunity to understand "
        "a system more deeply, find what breaks, and improve the way data "
        "moves from raw sources to something useful."
    ),
]
connect: list[dict[str, str]] = [
    {
        "platform": "LinkedIn",
        "url": "https://www.linkedin.com/in/mohammadsaif0655/",
        "icon": "linkedin",
    },
    {
        "platform": "GitHub",
        "url": "https://github.com/MohammadSaif001",
        "icon": "github",
    },
    {
        "platform": "Email",
        "url": "mailto:mohammadsaif005421@gmail.com",
        "icon": "email",
    },
]
