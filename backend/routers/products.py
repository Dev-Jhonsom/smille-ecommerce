from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from database import supabase

router = APIRouter(tags=["Produtos"])


@router.get("/products")
def get_products(
    department: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    max_price: Optional[float] = Query(None),
    search: Optional[str] = Query(None),
):
    """Lista produtos com filtros opcionais."""
    query = supabase.table("products").select("*").eq("in_stock", True)

    if department:
        # Inclui itens unissex em ambas as coleções
        query = query.in_("department", [department, "unissex"])

    if category:
        query = query.eq("category", category)

    if max_price:
        query = query.lte("price", max_price)

    response = query.execute()
    data = response.data

    # Filtro de busca textual (feito em Python por simplicidade)
    if search:
        term = search.lower()
        data = [
            p for p in data
            if term in p["name"].lower()
            or term in p["description"].lower()
            or term in p["category"].lower()
        ]

    return data


@router.get("/products/{product_id}")
def get_product(product_id: int):
    """Retorna detalhes de um produto pelo ID."""
    response = (
        supabase.table("products")
        .select("*")
        .eq("id", product_id)
        .single()
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return response.data
