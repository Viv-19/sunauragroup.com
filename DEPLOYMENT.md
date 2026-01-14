# AWS Amplify Deployment Guide

This guide provides a step-by-step walkthrough to deploy the SunAura frontend to **AWS Amplify** for $0 cost.

## 💰 Total Costing Breakdown (AWS Free Tier)

AWS Amplify Hosting is part of the **AWS 12-Month Free Tier**. If your account is less than 12 months old, you can host your site for **$0.00**.

| Metric | Free Tier Allowance | Price After/Above Limit |
| :--- | :--- | :--- |
| **Build & Deploy** | 1,000 Minutes / month | $0.01 per minute |
| **Storage** | 5 GB / month | $0.023 per GB-month |
| **Data Transfer** | 15 GB / month | $0.15 per GB served |

> [!TIP]
> **Why it's likely free for you**: A business portfolio site like SunAura typically consumes less than 1 GB of data transfer per month. You have 15 GB available for free.

---

## � Step-by-Step Deployment

### 1. Push Code to GitHub
Ensure your latest code (including the `frontend` folder) is pushed to your GitHub repository.

### 2. Connect to AWS Amplify
1. Log in to your [AWS Console](https://console.aws.amazon.com/).
2. Search for **AWS Amplify**.
3. Click **"Deploy an app"** or **"Get Started"** under Amplify Hosting.
4. Select **GitHub** and click **Next**.
5. Authorize AWS and select the `SunAura.co.in` repository.
6. Select the `main` branch.

### 3. Configure Build Settings
Amplify should auto-detect your React app. Ensure the settings look like this:
- **App Name**: `SunAura`
- **Build Settings YAML**:
  ```yaml
  version: 1
  frontend:
    phases:
      preBuild:
        commands:
          - cd frontend
          - npm install
      build:
        commands:
          - npm run build
    artifacts:
      baseDirectory: frontend/build
      files:
        - '**/*'
    cache:
      paths:
        - frontend/node_modules/**/*
  ```
7. Click **Next** -> **Save and Deploy**.

### 4. Custom Domain & SSL (Spaceship)
1. Once deployed, go to **Domain management** in the Amplify sidebar.
2. Click **Add domain**.
3. Type your domain name (e.g., `sunauragroup.com`) and click **Configure domain**.
4. AWS will provide a list of DNS records (CNAME, ANAME, or TXT for verification). **Keep this tab open.**
5. Go to your **Spaceship Account**:
   - Navigate to the **"Domain Manager"**.
   - Select your domain and go to **"DNS Settings"**.
   - Switch to the **"Advanced DNS"** or **"Custom DNS"** tab if necessary.
6. **Add the Records**:
   - **Verification**: If AWS asks for a TXT record, add it in Spaceship with the provided Host (`_amplify...`) and Value.
   - **Root Domain**: Add an **ALIAS** or **ANAME** record for the root (`@`) pointing to the Amplify address provided.
   - **WWW Subdomain**: Add a **CNAME** record for `www` pointing to the same Amplify address.
7. **Wait**: It can take 30 minutes to 24 hours for DNS to propagate. AWS will automatically handle the **Free SSL Certificate** (the lock icon in Chrome) once records are verified.

---

## 🔧 Maintenance
- **Automatic Deploys**: Every time you push to GitHub, Amplify will automatically rebuild and update your site.
- **Monitoring**: Check the "Monitoring" tab in Amplify to see your visitor traffic and bandwidth usage.
