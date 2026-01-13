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

### 4. Custom Domain & SSL
1. Once deployed, go to **Domain management** in the Amplify sidebar.
2. Click **Add domain** and enter your domain (e.g., `sunauragroup.com`).
3. AWS will automatically provision a **Free SSL Certificate** (the lock icon in Chrome).
4. Follow the instructions to update your DNS records at your domain registrar.

---

## 🔧 Maintenance
- **Automatic Deploys**: Every time you push to GitHub, Amplify will automatically rebuild and update your site.
- **Monitoring**: Check the "Monitoring" tab in Amplify to see your visitor traffic and bandwidth usage.
