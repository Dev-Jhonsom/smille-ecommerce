from pydantic import BaseModel, EmailStr
from typing import Optional, List


# ── Produtos ──────────────────────────────────────────────────────────────────

class ProductOut(BaseModel):
    id: int
    name: str
    department: str
    category: str
    price: float
    rating: float
    reviews_count: int
    image: str
    hover_image: Optional[str] = None
    description: str
    sizes: str   # JSON string e.g. '["P","M","G"]'
    in_stock: bool


# ── Pedidos ───────────────────────────────────────────────────────────────────

class OrderItem(BaseModel):
    product_id: int
    product_name: str
    size: str
    quantity: int
    price: float


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: str
    address: dict          # { cep, street, number, city, state }
    items: List[OrderItem]
    total: float
    payment_method: str    # pix | credit_card | boleto


class OrderOut(BaseModel):
    id: int
    customer_name: str
    customer_email: str
    total: float
    payment_method: str
    created_at: Optional[str] = None


# ── Newsletter ────────────────────────────────────────────────────────────────

class NewsletterCreate(BaseModel):
    email: str
