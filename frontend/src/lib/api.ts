const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  async getProducts() {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async subscribeNewsletter(email: string) {
    const res = await fetch(`${API_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error('Failed to subscribe');
    return res.json();
  },

  async sendContact(data: { name: string; email: string; message: string }) {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },

  async getVisitorCount() {
    const res = await fetch(`${API_URL}/visitors/count`);
    if (!res.ok) throw new Error('Failed to fetch visitor count');
    return res.json();
  },

  async incrementVisitors() {
    const res = await fetch(`${API_URL}/visitors/increment`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to increment visitors');
    return res.json();
  }
};
