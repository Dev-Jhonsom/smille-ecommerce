from fastapi import APIRouter, HTTPException
from schemas import NewsletterCreate
from database import supabase

router = APIRouter(tags=["Newsletter"])


@router.post("/newsletter", status_code=201)
def subscribe(data: NewsletterCreate):
    """Inscreve um e-mail no Club Smille."""
    # Verifica se o e-mail já está cadastrado
    existing = (
        supabase.table("newsletter")
        .select("id")
        .eq("email", data.email)
        .execute()
    )

    if existing.data:
        raise HTTPException(
            status_code=400,
            detail="Este e-mail já está inscrito no Club Smille."
        )

    response = supabase.table("newsletter").insert({"email": data.email}).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Erro ao inscrever e-mail")

    return {"message": "Bem-vindo ao Club Smille! Seu cupom de 15% OFF foi enviado. 🌅"}


@router.get("/newsletter")
def list_subscribers():
    """Lista todos os inscritos na newsletter."""
    response = (
        supabase.table("newsletter")
        .select("id, email, subscribed_at")
        .order("subscribed_at", desc=True)
        .execute()
    )
    return response.data
