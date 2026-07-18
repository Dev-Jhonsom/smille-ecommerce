# -*- coding: utf-8 -*-
import sys
import io
# Força saída UTF-8 no terminal Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

"""
Smille - Script de Seed
Popula a tabela 'products' no Supabase com os 10 produtos da colecao festival.
Execute: python seed.py
"""
import json
import sys
import os

# Garante que roda a partir da pasta backend/
sys.path.insert(0, os.path.dirname(__file__))

from database import supabase

products = [
    {
        "name": "Cropped Boho de Tricô Areia",
        "department": "feminino",
        "category": "roupas",
        "price": 139.90,
        "rating": 4.8,
        "reviews_count": 42,
        "image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=750&fit=crop&q=80&sat=-30",
        "description": "Cropped artesanal em tricô leve cor areia. Perfeito para sobreposições sob a luz dourada do pôr do sol, proporcionando leveza, conforto e estilo no festival.",
        "sizes": json.dumps(["PP", "P", "M", "G"]),
        "in_stock": True,
    },
    {
        "name": "Vestido Midi Estampa Sunset",
        "department": "feminino",
        "category": "roupas",
        "price": 249.90,
        "rating": 4.9,
        "reviews_count": 37,
        "image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Vestido fluido com estampa floral orgânica e tons quentes de pôr do sol. Confeccionado em viscose leve, ideal para dançar livremente do dia até a noite.",
        "sizes": json.dumps(["P", "M", "G"]),
        "in_stock": True,
    },
    {
        "name": "Corta-Vento Utilitário Terracota",
        "department": "masculino",
        "category": "roupas",
        "price": 289.90,
        "rating": 4.7,
        "reviews_count": 56,
        "image": "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Jaqueta corta-vento leve em tom terracota terroso. Possui bolsos frontais selados e capuz ajustável, trazendo funcionalidade utilitária com caimento premium.",
        "sizes": json.dumps(["P", "M", "G", "GG"]),
        "in_stock": True,
    },
    {
        "name": "Colete Tático Linho Clay",
        "department": "masculino",
        "category": "roupas",
        "price": 199.90,
        "rating": 4.9,
        "reviews_count": 61,
        "image": "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Colete de estilo tático repensado em alfaiataria leve com bolsos modulares. Um item indispensável para sobreposições estilosas e práticas em festivais.",
        "sizes": json.dumps(["M", "G", "GG"]),
        "in_stock": True,
    },
    {
        "name": "Óculos Solar Âmbar Premium",
        "department": "unissex",
        "category": "acessorios",
        "price": 89.90,
        "rating": 4.6,
        "reviews_count": 112,
        "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Óculos escuros unissex com lentes degradê âmbar e armação de acetato leve. Estilo retrô-moderno que protege contra raios UVA/UVB.",
        "sizes": json.dumps(["U"]),
        "in_stock": True,
    },
    {
        "name": "Vestido Off-White Sunset Glow",
        "department": "feminino",
        "category": "roupas",
        "price": 189.90,
        "rating": 4.8,
        "reviews_count": 29,
        "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Vestido curto de modelagem fluida na cor mostarda suave. Tecido de linho misto super arejado, perfeito para curtir festivais de tarde até a noite.",
        "sizes": json.dumps(["PP", "P", "M", "G"]),
        "in_stock": True,
    },
    {
        "name": "Calça Cargo Jogger Linho Khaki",
        "department": "masculino",
        "category": "roupas",
        "price": 229.90,
        "rating": 4.7,
        "reviews_count": 48,
        "image": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Calça cargo modelagem jogger produzida em mistura premium de algodão e linho. Bolso utilitário nas laterais, caimento solto e punhos ajustáveis.",
        "sizes": json.dumps(["P", "M", "G", "GG"]),
        "in_stock": True,
    },
    {
        "name": "Conjunto Linho Terracota e Areia",
        "department": "feminino",
        "category": "conjuntos",
        "price": 219.90,
        "rating": 4.9,
        "reviews_count": 23,
        "image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Conjunto feminino coordenado em linho premium, misturando tons terracota e areia. A combinação perfeita de sofisticação artesanal e conforto para o gramado.",
        "sizes": json.dumps(["PP", "P", "M", "G"]),
        "in_stock": True,
    },
    {
        "name": "Kimono Estampado Desert Vibe",
        "department": "feminino",
        "category": "roupas",
        "price": 159.90,
        "rating": 5.0,
        "reviews_count": 15,
        "image": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Kimono de corte amplo com estampa boho desértica e franjas leves na barra. A peça de sobreposição perfeita para dar movimento ao look de festival.",
        "sizes": json.dumps(["PP", "P", "M", "G"]),
        "in_stock": True,
    },
    {
        "name": "Camisa Algodão Estampa Étnica",
        "department": "masculino",
        "category": "roupas",
        "price": 129.90,
        "rating": 4.8,
        "reviews_count": 74,
        "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=750&fit=crop&q=80",
        "hover_image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=750&fit=crop&q=80&blur=2",
        "description": "Camisa de botão masculina com caimento solto e estampa étnica texturizada em tons quentes. Tecido de algodão puro respirável para aguentar o calor da pista.",
        "sizes": json.dumps(["P", "M", "G", "GG"]),
        "in_stock": True,
    },
]


def run_seed():
    print("[SEED] Iniciando seed da Smille Store...")

    # Limpa tabela antes de inserir (evita duplicatas)
    supabase.table("products").delete().neq("id", 0).execute()
    print("[SEED] Tabela limpa com sucesso.")

    response = supabase.table("products").insert(products).execute()

    if response.data:
        print(f"[SEED] {len(response.data)} produtos inseridos com sucesso!")
    else:
        print("[SEED] Erro ao inserir produtos:", response)


if __name__ == "__main__":
    run_seed()
