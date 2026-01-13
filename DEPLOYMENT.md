# Deployment & AWS Free Tier Guide

This project is a React-based frontend application. It can be hosted for **$0 cost** on AWS if you stay within the Free Tier limits.

## 💰 AWS Free Tier Comparison

| Service | Cost | Duration | Best For |
| :--- | :--- | :--- | :--- |
| **AWS Amplify** | $0 | 12 Months | Easiest (Auto-deploy from GitHub) |
| **S3 + CloudFront** | $0 | **Forever** (Mostly) | Long-term free hosting |
| **AWS EC2** | $0 | 12 Months | Full server control (Not recommended for this site) |

---

### 🚀 Recommendation for $0 Cost
For a simple business website like SunAura, use **AWS S3 + CloudFront**. 
*   **S3** is free for 12 months (5GB).
*   **CloudFront** has a **Forever Free Tier** that includes **1TB of data transfer out** per month, which is more than enough for this project.

---

## Recommended Hosting: Vercel, Netlify, or AWS Amplify

The easiest way to deploy is using Vercel, Netlify, or AWS Amplify.

### 🛠 Step-by-Step: AWS Amplify (Easiest & Secure)

This method gives you **HTTPS (locked icon in Chrome)** automatically and updates the site every time you push code to GitHub.

#### Phase 1: Preparation
1.  **GitHub**: Make sure your project is pushed to a GitHub repository.
2.  **Build Check**: Run `npm run build` inside the `frontend` folder once locally to ensure there are no errors.

#### Phase 2: Connecting AWS
1.  Login to **[AWS Console](https://console.aws.amazon.com/)**.
2.  Search for **"AWS Amplify"** in the top search bar.
3.  Click **"New app"** (orange button) -> **"Host web app"**.
4.  Select **GitHub** and click **Continue**.
5.  Authorize AWS to access your GitHub and select the `SunAura.co.in` repository.
6.  **Branch**: Select `main`.
7.  **Build Settings**: AWS should detect the settings. Double-check them:
    *   **App Root**: `frontend`
    *   **Build Command**: `npm run build`
    *   **Base Directory**: `build`
8.  Click **"Next"** -> **"Save and Deploy"**.

#### Phase 3: Visibility on Chrome (Custom Domain)
By default, your site will be at `https://main.xxxxxx.amplifyapp.com`. To use `SunAura.co.in`:
1.  In the Amplify sidebar, go to **"Domain Management"**.
2.  Click **"Add domain"**.
3.  Enter your domain name (e.g., `sunauragroup.com`).
4.  AWS will generate **CNAME** and **ANAME** records for you.
5.  Go to your domain provider (GoDaddy, Namecheap, etc.) and enter these records into their DNS settings.
6.  Wait 30-60 minutes for SSL activation. You will then see the **"Secure"** green lock in Chrome!

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

## Other AWS Deployment Methods

### AWS S3 + CloudFront (Static Website Hosting)
This is the most cost-effective way to host a static React app on AWS.
1. **S3**: Create an S3 bucket with "Static website hosting" enabled and upload the contents of your `build/` folder.
2. **CloudFront**: Create a CloudFront distribution pointing to your S3 bucket.
3. **Routing**: Configure CloudFront to redirect 403/404 errors to `/index.html` with a 200 response to handle client-side routing.

### AWS EC2 (Virtual Server)
If you prefer full control over the server:
1. Launch an EC2 instance (Ubuntu recommended).
2. Install Nginx: `sudo apt update && sudo apt install nginx`.
3. Link your files: Point Nginx to the `build/` folder.
4. Use the Nginx configuration provided in the "Manual Traditional Hosting" section below.

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
