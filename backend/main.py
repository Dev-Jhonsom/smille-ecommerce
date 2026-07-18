from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, orders, newsletter

app = FastAPI(
    title="Smille API",
    description="Backend da loja de moda festival Smille 🌅",
    version="1.0.0",
)

# Permite requisições do frontend React (dev e produção)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:4173",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(newsletter.router, prefix="/api")


@app.get("/", tags=["Status"])
def root():
    return {
        "status": "online",
        "message": "Smille API rodando! 🌅",
        "docs": "/docs",
    }
