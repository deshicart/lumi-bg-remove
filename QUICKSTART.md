# 🚀 Quick Start Guide

Get Lumi Bg Remove up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Firebase account (free tier works)
- Remove.bg API key (free tier: 50 calls/month)

## 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/deshicart/lumi-bg-remove.git
cd lumi-bg-remove

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend/functions
npm install
cd ../..
```

## 2. Firebase Setup (5 minutes)

### Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "lumi-bg-remove"
4. Enable Google Analytics (optional)
5. Click "Create project"

### Enable Services
1. **Authentication**: Build > Authentication > Get Started > Enable Email/Password
2. **Firestore**: Build > Firestore Database > Create database > Start in production mode
3. **Storage**: Build > Storage > Get Started > Start in production mode
4. **Upgrade to Blaze Plan**: For Firebase Functions (pay-as-you-go, free tier available)

### Get Firebase Config
1. Go to Project Settings (⚙️ icon)
2. Under "Your apps", click Web icon (</>)
3. Register app name: "Lumi Bg Remove"
4. Copy the config values

## 3. Environment Setup

### Frontend Configuration
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc123
```

### Get Remove.bg API Key
1. Go to https://www.remove.bg/users/sign_up
2. Sign up for free account
3. Go to https://www.remove.bg/api
4. Copy your API key

### Backend Configuration
```bash
# Login to Firebase
firebase login

# Set your project
firebase use --add
# Select your project, alias: default

# Configure Remove.bg API key
firebase functions:config:set removebg.apikey="YOUR_REMOVE_BG_API_KEY"
```

## 4. Run Locally

```bash
# Start development server
cd frontend
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

## 5. Deploy to Firebase

```bash
# Build frontend
cd frontend
npm run build
cd ..

# Deploy everything
firebase deploy
```

Your app will be live at: `https://your-project.web.app`

## Troubleshooting

### Build Fails
```bash
# Clear and reinstall
rm -rf frontend/node_modules frontend/package-lock.json
cd frontend && npm install
```

### Firebase Deploy Fails
```bash
# Ensure you're logged in
firebase login --reauth

# Check project
firebase projects:list
firebase use your-project-id
```

### API Not Working
```bash
# Verify config
firebase functions:config:get

# Redeploy functions
firebase deploy --only functions
```

## Next Steps

1. ✅ Test the application
2. ✅ Customize branding/colors
3. ✅ Set up custom domain
4. ✅ Configure Google AdSense
5. ✅ Monitor usage in Firebase Console

## Need Help?

- 📖 Read the full [SETUP.md](SETUP.md)
- 🐛 Report issues on [GitHub](https://github.com/deshicart/lumi-bg-remove/issues)
- 📧 Contact: support@lumibgremove.com

---

**You're all set! Start removing backgrounds! 🎨**
