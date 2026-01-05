# MongoDB Setup for SunAura

## 🚨 MongoDB Not Installed Locally

MongoDB is not installed on your system. You have two options:

---

## ✅ OPTION 1: MongoDB Atlas (Recommended - Quick Setup)

**Free cloud MongoDB database - No installation needed!**

### Step 1: Create Free MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free (Google/GitHub login works)
3. Choose **FREE M0 tier** (512MB storage)

### Step 2: Create a Cluster

1. After signup, click "Build a Database"
2. Choose **M0 FREE** tier
3. Select closest region (e.g., AWS Mumbai for India)
4. Click "Create Cluster"

### Step 3: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 4: Update Backend .env

Edit `backend/.env`:
```env
MONGO_URL=mongodb+srv://username:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/
DB_NAME=sunaura
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
```

**Important:** Replace `YOUR_PASSWORD` with your actual password!

### Step 5: Allow Network Access

1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 6: Restart Backend

```bash
cd backend
python -m uvicorn server:app --reload
```

✅ **Done!** Your app will now connect to MongoDB Atlas.

---

## OPTION 2: Install MongoDB Locally

### Windows Installation

1. Download MongoDB Community Server:
   https://www.mongodb.com/try/download/community

2. Run installer:
   - Choose "Complete" installation
   - Install as Windows Service: **YES**
   - Service Name: `MongoDB`

3. Start MongoDB:
   ```powershell
   net start MongoDB
   ```

4. Keep backend .env as is:
   ```env
   MONGO_URL=mongodb://localhost:27017/
   DB_NAME=sunaura
   ```

---

## 🎯 Recommended: Use MongoDB Atlas

**Why MongoDB Atlas?**
- ✅ No installation needed
- ✅ Free forever (512MB)
- ✅ Cloud backup included
- ✅ Access from anywhere
- ✅ Production-ready
- ✅ Setup in 5 minutes

**MongoDB Atlas is the fastest way to get your app running!**

---

## 📝 Quick Commands After Setup

```bash
# Start backend
cd backend
python -m uvicorn server:app --reload

# Start frontend (in second terminal)
cd frontend
npm start
```

**Access:** http://localhost:3000

---

## ❓ Need Help?

If you choose MongoDB Atlas, I can help you:
1. Create an account
2. Get your connection string
3. Update your .env file

Just let me know!
