from fastapi import APIRouter, HTTPException
from schemas import OrderCreate
from database import supabase
import json

router = APIRouter(tags=["Pedidos"])


@router.post("/orders", status_code=201)
def create_order(order: OrderCreate):
    """Registra um novo pedido no banco."""
    order_data = {
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "address": json.dumps(order.address, ensure_ascii=False),
        "items": json.dumps(
            [item.model_dump() for item in order.items], ensure_ascii=False
        ),
        "total": order.total,
        "payment_method": order.payment_method,
    }

    response = supabase.table("orders").insert(order_data).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Erro ao criar pedido")

    return {
        "message": "Pedido criado com sucesso! 🎉",
        "order_id": response.data[0]["id"],
    }


@router.get("/orders")
def get_orders():
    """Lista todos os pedidos (mais recentes primeiro)."""
    response = (
        supabase.table("orders")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )
    return response.data
