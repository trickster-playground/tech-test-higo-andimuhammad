📦 Fullstack App – Backend & Frontend
Repositori ini berisi dua bagian utama:

Frontend: Dibuat dengan Next.js. Link hosting : https://tech-test-andimuhammad-frontend-frontend.up.railway.app/
Backend: REST API Node Js Framework Express Js. Link hosting : https://tech-test-higo-andimuhammad-production.up.railway.app/
Database: MongoDB Atlas (Cloud)
Api Docs: https://tech-test-higo-andimuhammad-production.up.railway.app/api-docs/


🔧 Struktur Direktori
.
├── backend/      # Folder untuk backend (API server Node Js Framework Express Js)
├── frontend/     # Folder untuk frontend (Next.js )
├── README.md

🚀 Cara Menjalankan Proyek
1. Clone Repository
git clone https://github.com/trickster-playground/tech-test-higo-andimuhammad.git
cd nama-repo

2. Menjalankan Backend
Masuk ke folder backend:
cd backend

Install dependencies:
npm install

Buat file .env:
PORT=5000
MONGO_URI=mongodb+srv://trickstercodedev:<db_password>@higo-db.xob0b2y.mongodb.net/?retryWrites=true&w=majority&appName=higo-db

Jalankan server:
npm start
Backend biasanya berjalan di http://localhost:5000

3. Menjalankan Frontend
Masuk ke folder frontend:
cd ../frontend

Install dependencies:
npm install

Buat file .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000

Jalankan aplikasi:
npm run dev
Frontend berjalan di http://localhost:3000

🧪 Fitur

📊 Data analytics (contoh: visualisasi gender)
🔍 Pagination 
⚙️ API consumption dari frontend

🛠️ Teknologi yang Digunakan

Frontend:
Next.js / React
Axios
Tailwind CSS (jika digunakan)

Backend:
Express.js 
MongoDB

📄 License
MIT License © 2025 Andi Muhammad Fadhil Masyhun Arham


