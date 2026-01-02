# GitHub Pages Setup Instructions

This app is now configured to automatically deploy to GitHub Pages when you push to the main branch.

## One-Time Setup Required

To enable GitHub Pages for this repository, you need to configure it in your GitHub repository settings:

1. Go to your repository on GitHub: `https://github.com/JMcMullen1/Baking_App`
2. Click on **Settings** (in the repository menu)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

## How It Works

Once you've completed the setup:

1. Every push to the `main` branch will automatically trigger a build and deployment
2. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
   - Install dependencies
   - Build the Expo web app
   - Deploy to GitHub Pages
3. Your app will be available at: `https://JMcMullen1.github.io/Baking_App/`

## Manual Deployment

You can also manually trigger a deployment:

1. Go to the **Actions** tab in your repository
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the branch (main) and click **Run workflow**

## Troubleshooting

If you still see a 404 error after setup:

1. Check that GitHub Pages is enabled in Settings → Pages
2. Make sure the Source is set to "GitHub Actions"
3. Check the Actions tab to ensure the workflow ran successfully
4. Wait a few minutes for the deployment to complete
5. Clear your browser cache and try again

## Local Development

To run the app locally:
```bash
npm install --legacy-peer-deps
npm run web
```

To build locally:
```bash
npm run build:web
```

The built files will be in the `dist/` directory.
