# SunAura Project Structure & Architecture

This document provides a summary of the project architecture and a guide to where specific code is located.

## Project Summary
SunAura is a high-performance, responsive web application for an authorized Racold distributor. It serves as a digital catalog and lead generation tool, connecting customers directly to the distributor via WhatsApp integration.

## Folder Structure

```text
SunAura.co.in/
├── frontend/                # Main React application directory
│   ├── public/              # Static files
│   │   └── assets/          # Image assets (Products, Logos, Backgrounds)
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable React components
│   │   │   └── ui/          # UI primitives (Buttons, Inputs, etc.)
│   │   ├── data/            # Application data and configuration
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page-level components
│   │   ├── App.js           # Routing and core logic
│   │   └── index.js         # Entry point
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── package.json         # Dependencies and scripts
└── README.md                # Project overview
```

## Key Code Locations

### ⚙️ Central Configuration
- **File**: `frontend/src/data/website-config.js`
- **Purpose**: This is the "brain" of the application. All product categories, individual products, features, project details, and contact settings (phone, email, WhatsApp) are defined here. Modifying this file updates the entire site.

### 🏠 Pages
- **Home Page**: `frontend/src/pages/Home.jsx` - Assembles the hero, products grid, projects, and contact sections.
- **Category Details**: `frontend/src/pages/CategoryProducts.jsx` - Dynamic page that shows products for a specific category based on the URL.

### 🧱 Core Components
- **Navbar**: `frontend/src/components/Navbar.jsx` - Contains the navigation logic and links.
- **Hero**: `frontend/src/components/Hero.jsx` - The main landing section with rotating background images.
- **Contact Form**: `frontend/src/components/Contact.jsx` - Handles the inquiry logic and WhatsApp redirection.
- **Project Slider**: `frontend/src/components/Projects.jsx` - Displays successful installations with an automated slider.

### 🎨 Styles
- **Global Styles**: `frontend/src/index.css` - Contains Tailwind directives and base design tokens.
- **Component Styles**: `frontend/src/App.css` - Custom animations (glass effects, transitions) and section spacing.

## Data Flow
The application follows a data-driven approach where React components consume the `websiteConfig` object. This makes it extremely easy to update content without touching the component logic.
