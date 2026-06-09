# Invofest Backend - API Gateway Service

Repository ini berisi kode sumber untuk sisi *server-side* (Backend) aplikasi **Invofest** (Innovation Festival). Layanan ini berfungsi sebagai penyedia RESTful API utama yang mengelola seluruh alur autentikasi, manajemen data event, kategori, pembicara, hingga sistem kontrol pengguna secara terpusat.

Layanan backend ini telah terkonfigurasi secara penuh dan di-*deploy* secara otomatis menggunakan infrastruktur cloud **Railway**.

---

## Tech Stack & Database Architecture

* **Runtime Environment:** Node.js
* **Framework:** Express.js (atau framework Node.js sejenis yang lo gunakan)
* **Language:** TypeScript / JavaScript (ES6+)
* **Database Cloud Provider:** MySQL Database
* **Authentication:** JSON Web Token (JWT) dengan enkripsi *secret key*
* **Security & Middleware:** CORS Handling, Express Validator, Bcrypt Hashing

---

## API Endpoints & Gateway Documentation

Berikut adalah rangkuman endpoint utama yang disediakan oleh backend untuk dikonsumsi oleh sisi frontend:

### 1. Authentication & Users Module
* `POST /api/auth/register` - Mendaftarkan akun administrator atau user baru.
* `POST /api/auth/login` - Memverifikasi kredensial akun dan menghasilkan JWT Token.
* `GET /api/auth/users` - Mengambil seluruh daftar pengguna terdaftar (*real-time stats*).
* `GET /api/auth/users/:id` - Mengambil detail profil user spesifik berdasarkan ID.
* `PUT /api/auth/users/:id` - Memperbarui informasi akun (Nama, Email, Password).

### 2. Events Module
* `GET /api/events` - Mengambil seluruh data kompetisi, seminar, workshop, dan talkshow.
* `GET /api/events/:id` - Mengambil detail lengkap satu event spesifik.
* `POST /api/events` - Membuat event baru *(Protected Area)*.
* `PUT /api/events/:id` - Memperbarui data event lama berdasarkan parameter ID *(Protected Area)*.
* `DELETE /api/events/:id` - Menghapus data event dari database *(Protected Area)*.

### 3. Categories Module
* `GET /api/categories` - Mengambil daftar seluruh kategori event.
* `GET /api/categories/:id` - Mengambil detail satu kategori spesifik.
* `POST /api/categories` - Menambahkan kategori event baru *(Protected Area)*.
* `PUT /api/categories/:id` - Mengedit nama kategori lama *(Protected Area)*.

### 4. Speakers Module
* `GET /api/speakers` - Mengambil daftar seluruh pembicara/speakers.
* `GET /api/speakers/:id` - Mengambil detail pembicara berdasarkan ID.
* `POST /api/speakers` - Menambahkan pembicara baru beserta URL avatar *(Protected Area)*.
* `PUT /api/speakers/:id` - Memperbarui biodata dan peran pembicara *(Protected Area)*.

---

## Credentials & Live Demo Deployment
Berikut adalah alamat server live produksi serta akun uji coba yang terhubung langsung ke database cloud:

Production API URL: https://be-uts-production-526f.up.railway.app


Link Video Dokumentasi Sistem: https://youtu.be/zT4THS-7org

---
## Author & Kepenulisan
Sistem backend dan database cloud ini dikembangkan dan dikonfigurasi penuh oleh:

Nama Lengkap: Devita Anggraeni 

Program Studi: Sarjana Terapan Teknik Informatika

Universitas: Harkat Negeri University
---