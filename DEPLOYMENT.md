# Deployment Guide

This project is a React-based frontend application. It can be deployed as a static site to various hosting platforms.

## Recommended Hosting: Vercel or Netlify (Zero Configuration)

The easiest way to deploy is using Vercel or Netlify.

### Vercel Deployment
1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect the React framework and Craco configuration.
5. Click **Deploy**.

### Netlify Deployment
1. Go to [netlify.com](https://netlify.com) and sign in.
2. Click **Add new site** > **Import an existing project**.
3. Choose your Git provider and select the repository.
4. Ensure the build settings are:
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Click **Deploy site**.

## Manual Traditional Hosting

If you are using a traditional hosting service (cPanel, Shared Hosting, or VPS):

1. **Build the project locally**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload the files**:
   - The build process will create a `build/` folder inside the `frontend` directory.
   - Upload the **contents** of the `frontend/build/` folder to your server's root directory (usually `public_html` or `/var/www/html`).

3. **Configure Routing (Crucial)**:
   This project uses `react-router-dom`. If you refresh on any subpage (like `/category/storage-geyser`), you might get a 404.
   - **Apache (.htaccess)**:
     Create an `.htaccess` file in your root folder with:
     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
     </IfModule>
     ```
   - **Nginx (nginx.conf)**:
     Add this to your configuration block:
     ```nginx
     location / {
       try_files $uri /index.html;
     }
     ```

## Environment Variables
If you decide to add sensitive keys in the future, create a `.env` file in the `frontend` directory. Note that all vars must start with `REACT_APP_` to be accessible.

## Production Checklist 🚀
- [ ] Run `npm run build` to ensure the project compiles.
- [ ] Check `website-config.js` to ensure all contact details are correct.
- [ ] Verify that the `sitemap.xml` and `robots.txt` in the `public` folder are up to date.
