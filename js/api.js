// Tempat komunikasi backend/API MAB-News.
// Untuk tahap berikutnya, endpoint artikel, kategori, media, dan auth
// dapat dipusatkan di sini agar frontend mudah dipindahkan dari mock data ke API.

const API_BASE_URL = "";

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error(`API Error ${response.status}`);
  return response.json();
}
