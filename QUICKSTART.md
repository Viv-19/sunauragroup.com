# SunAura.co.in - Quick Start Guide

## 🚀 Three Commands to Run

### 1. Setup Environment (One-time)
```bash
# Backend
cd backend
copy .env.example .env
pip install -r requirements.txt

# Frontend  
cd frontend
copy .env.example .env
# npm packages already installed
```

### 2. Start MongoDB
```bash
net start MongoDB
```

### 3. Run Servers

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn server:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## 🔐 Admin Access

**Login:** http://localhost:3000/admin/login
- Email: `admin@sunaura.com`
- Password: `admin123`

---

## 📚 Full Documentation

See [README.md](README.md) for complete setup instructions, API documentation, and deployment guide.

