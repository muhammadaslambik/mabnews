// Tempat komunikasi backend/API MAB-News.
// Untuk tahap berikutnya, endpoint artikel, kategori, media, dan auth
// dapat dipusatkan di sini agar frontend mudah dipindahkan dari mock data ke API.

const API_BASE_URL = "https://mabnews-backend.vercel.app";

// ---------------------------------------------------------------
// Konfigurasi ImageKit (untuk upload gambar langsung dari browser).
// Public Key & URL Endpoint AMAN untuk ditaruh di frontend (berbeda
// dengan Private Key yang wajib tetap rahasia dan hanya ada di server).
//
// Ambil dari dashboard ImageKit.io -> Developer Options:
//   - Public Key    -> mulai dengan "public_..."
//   - URL Endpoint  -> bentuknya "https://ik.imagekit.io/nama-akun-anda"
//
// TODO: GANTI dua nilai di bawah ini dengan milik Anda sebelum upload
// gambar bisa berfungsi.
// ---------------------------------------------------------------
const IMAGEKIT_PUBLIC_KEY = "public_UTu0O5OC0Ie+08TZQHbvc8eBpRE=";
const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/mabnews";

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error(`API Error ${response.status}`);
  return response.json();
}
