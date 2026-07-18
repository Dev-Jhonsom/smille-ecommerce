/**
 * Smille - Serviço de API
 * Centraliza todas as chamadas ao backend FastAPI (Python).
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ── Produtos ──────────────────────────────────────────────────────────────────

/**
 * Busca produtos com filtros opcionais.
 * @param {Object} filters - { department, category, maxPrice, search }
 */
export async function getProducts(filters = {}) {
  const params = new URLSearchParams();
  if (filters.department) params.append('department', filters.department);
  if (filters.category)   params.append('category', filters.category);
  if (filters.maxPrice)   params.append('max_price', filters.maxPrice);
  if (filters.search)     params.append('search', filters.search);

  const res = await fetch(`${API_URL}/api/products?${params}`);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

/**
 * Busca os detalhes de um produto por ID.
 * @param {number} id
 */
export async function getProduct(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) throw new Error('Produto não encontrado');
  return res.json();
}

// ── Pedidos ───────────────────────────────────────────────────────────────────

/**
 * Cria um novo pedido.
 * @param {Object} orderData - { customer_name, customer_email, address, items, total, payment_method }
 */
export async function createOrder(orderData) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Erro ao criar pedido');
  }
  return res.json();
}

// ── Newsletter ────────────────────────────────────────────────────────────────

/**
 * Inscreve um e-mail na newsletter.
 * @param {string} email
 */
export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_URL}/api/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Erro ao inscrever e-mail');
  return data;
}
