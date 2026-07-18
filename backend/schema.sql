-- ============================================================
-- Smille Store - Schema do Banco de Dados (Supabase/PostgreSQL)
-- Cole este SQL no Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
    id            SERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    department    TEXT NOT NULL CHECK (department IN ('feminino','masculino','unissex')),
    category      TEXT NOT NULL CHECK (category IN ('roupas','conjuntos','acessorios')),
    price         FLOAT NOT NULL,
    rating        FLOAT DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    image         TEXT,
    hover_image   TEXT,
    description   TEXT,
    sizes         TEXT,   -- Array serializado em JSON: '["P","M","G"]'
    in_stock      BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS orders (
    id               SERIAL PRIMARY KEY,
    customer_name    TEXT NOT NULL,
    customer_email   TEXT NOT NULL,
    address          TEXT,   -- JSON serializado
    items            TEXT,   -- JSON serializado
    total            FLOAT NOT NULL,
    payment_method   TEXT CHECK (payment_method IN ('pix','credit_card','boleto')),
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Newsletter
CREATE TABLE IF NOT EXISTS newsletter (
    id             SERIAL PRIMARY KEY,
    email          TEXT UNIQUE NOT NULL,
    subscribed_at  TIMESTAMPTZ DEFAULT NOW()
);
