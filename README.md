# SunAura.co.in

**Professional Solar Water Heater & Heat Pump Solutions Website**

A full-stack web application for SunAura, an authorized Racold distributor specializing in solar water heaters and heat pump installations for residential and commercial projects.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38bdf8)

---

## 🌟 Features

### Public Website
- **Modern Hero Section** - Eye-catching landing page with smooth scrolling
- **Product Showcase** - Display solar water heaters and heat pumps with features and brochures
- **Project Portfolio** - Showcase successful installations with images and descriptions
- **Contact Form** - Integrated contact form with WhatsApp integration
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Google Maps Integration** - Embedded location map

### Admin Dashboard
- **Secure Authentication** - JWT-based admin login system
- **Product Management** - CRUD operations for products with image uploads
- **Project Management** - CRUD operations for projects with multiple image support
- **Message Management** - View and manage customer inquiries
- **Settings Management** - Update business information, contact details, and map

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **Sonner** - Toast notifications
- **CRACO** - Custom React Scripts configuration

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database via Motor (async driver)
- **Pydantic** - Data validation
- **JWT** - JSON Web Tokens for authentication
- **Passlib** - Password hashing with bcrypt
- **Uvicorn** - ASGI server

---

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SunAura.co.in.git
cd SunAura.co.in
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env  # On Windows
# cp .env.example .env  # On macOS/Linux

# Edit .env file with your MongoDB credentials
```

**Backend `.env` Configuration:**
```env
MONGO_URL=mongodb://localhost:27017/
DB_NAME=sunaura
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env  # On Windows
# cp .env.example .env  # On macOS/Linux
```

**Frontend `.env` Configuration:**
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows (if installed as service):
net start MongoDB

# On macOS:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux

uvicorn server:app --reload
```

Backend will run on **http://localhost:8000**

### Start Frontend Development Server

```bash
cd frontend
npm start
```

Frontend will run on **http://localhost:3000**

---

## 🔐 Admin Access

**Default Admin Credentials:**
- **Email:** `admin@sunaura.com`
- **Password:** `admin123`

> ⚠️ **Important:** Change these credentials in production!

**Admin Dashboard:** http://localhost:3000/admin/login

---

## 📡 API Documentation

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@sunaura.com",
  "password": "admin123"
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>
```

### Products

```http
GET    /api/products              # Get all products (public)
POST   /api/products              # Create product (auth required)
PUT    /api/products/{id}         # Update product (auth required)
DELETE /api/products/{id}         # Delete product (auth required)
```

### Projects

```http
GET    /api/projects              # Get all projects (public)
POST   /api/projects              # Create project (auth required)
PUT    /api/projects/{id}         # Update project (auth required)
DELETE /api/projects/{id}         # Delete project (auth required)
```

### Contact Messages

```http
POST   /api/contact               # Submit contact form (public)
GET    /api/contact               # Get all messages (auth required)
DELETE /api/contact/{id}          # Delete message (auth required)
```

### Settings

```http
GET    /api/settings              # Get settings (public)
PUT    /api/settings              # Update settings (auth required)
```

### File Upload

```http
POST   /api/upload                # Upload file (auth required)
```

**Interactive API Docs:** http://localhost:8000/docs

---

## 📁 Project Structure

```
SunAura.co.in/
├── backend/
│   ├── .env                    # Environment variables (not in git)
│   ├── .env.example            # Example environment file
│   ├── requirements.txt        # Python dependencies
│   ├── server.py              # FastAPI application
│   └── static/
│       └── uploads/           # Uploaded files
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # UI components (Sonner, etc.)
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Projects.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminMessages.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminProjects.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   └── Home.jsx
│   │   ├── hooks/
│   │   │   └── use-theme.js
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env                   # Frontend environment (not in git)
│   ├── components.json        # Shadcn config
│   ├── craco.config.js        # CRACO configuration
│   ├── jsconfig.json          # JS path aliases
│   ├── package.json           # Node dependencies
│   ├── postcss.config.js      # PostCSS config
│   └── tailwind.config.js     # Tailwind config
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🎨 Customization

### Updating Business Information

1. Login to admin dashboard
2. Navigate to **Settings**
3. Update dealer name, phone, email, address, WhatsApp number, and map URL
4. Click **Save Settings**

### Adding Products

1. Login to admin dashboard
2. Navigate to **Products**
3. Click **Add Product**
4. Upload product image
5. Enter product name and features
6. Optionally upload brochure
7. Click **Save**

### Adding Projects

1. Login to admin dashboard
2. Navigate to **Projects**
3. Click **Add Project**
4. Upload project images
5. Enter project title and description
6. Click **Save**

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `build/` directory to your hosting platform

3. Set environment variable:
   - `REACT_APP_BACKEND_URL=https://your-backend-api.com`

### Backend Deployment (Render/Railway/AWS)

1. Set up MongoDB Atlas or use existing MongoDB instance

2. Configure environment variables on your hosting platform:
   - `MONGO_URL`
   - `DB_NAME`
   - `JWT_SECRET`
   - `CORS_ORIGINS`

3. Deploy using:
   ```bash
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```

---

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
pytest
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

Built with ❤️ for SunAura - Authorized Racold Distributor

---

## 📞 Support

For issues or questions, please create an issue on GitHub or contact the development team.

---

## 🔄 Version History

- **v1.0.0** - Initial release with complete frontend and backend
  - Product and project management
  - Contact form integration
  - Admin dashboard with authentication
  - Responsive design