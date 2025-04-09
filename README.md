```markdown
# VeriCapture – Dockerized Node.js + PostgreSQL Backend API

A complete backend application built with **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**, fully Dockerized and ready for modern API development with support for authentication, form submission, and table migrations.

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **PostgreSQL** (via Docker)
- **Sequelize ORM** (w/ migrations)
- **Docker** + **Docker Compose**
- **bcrypt.js** (password hashing)
- **CORS**, **dotenv**, **body-parser**
- **Postman** or **cURL** for API testing
- **TablePlus** (GUI for database management)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourname/vericapture-backend.git
cd vericapture-backend
```

---

### 2️⃣ Environment Configuration

Create a `.env` file:

```ini
PORT=5000
DB_HOST=postgres
DB_NAME=mydatabase
DB_USER=myuser
DB_PASS=mypassword
```

Make sure these match your `docker-compose.yml`.

---

### 3️⃣ Project Setup

Install required dependencies:

```bash
npm install
```

Initialize Sequelize:

```bash
npx sequelize-cli init
```

Configure your `config/config.json` or `config/config.js` to use the environment variables above.

---

### 4️⃣ Dockerized PostgreSQL Setup

Launch the Docker container:

```bash
docker-compose up -d
```

This runs:
- **PostgreSQL** on port 5432
- **Backend API** on port 5000

---

### 5️⃣ Database Migrations

Create models and run migrations:

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,username:string,password:string,country:string

npx sequelize-cli db:migrate
```

---

## 🧪 API Usage

### ✅ Signup

`POST /api/v1/users/signup`

```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice@example.com",
  "username": "alicesmith",
  "password": "securepass123",
  "country": "UK"
}
```

---

### ✅ Login

`POST /api/v1/users/login`

```json
{
  "emailOrUsername": "alicesmith",
  "password": "securepass123"
}
```

---

## 📊 TablePlus Connection

To connect with TablePlus:

- Host: `localhost`
- Port: `5432`
- User: `myuser`
- Password: `mypassword`
- Database: `mydatabase`

---

## 📂 Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── .env
├── server.js
├── config/
│   └── config.json
├── models/
│   └── user.js
├── migrations/
│   └── xxxx-create-user.js
└── README.md
```

---

## 🔐 Security Notes

- Use **bcrypt.js** for password hashing
- Do **not store plain-text passwords**
- Use **env variables** for sensitive config

---

## 💡 Tips

- Use `docker-compose down -v` to wipe volumes
- Always run `npx sequelize-cli db:migrate` after changes
- Use Postman or cURL to test your endpoints

---

## 🧹 Scripts

```bash
npm start               # Start backend server
docker-compose up -d   # Start database and backend
npx sequelize-cli db:migrate  # Apply DB schema
```

---

