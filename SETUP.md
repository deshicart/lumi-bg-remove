# 📚 Lumi Bg Remove - সম্পূর্ণ সেটআপ গাইড

এই গাইডে আপনি শিখবেন কিভাবে Lumi Bg Remove অ্যাপ্লিকেশন সেটআপ এবং deploy করতে হয়।

## 📋 সূচিপত্র

1. [প্রয়োজনীয় সফটওয়্যার](#প্রয়োজনীয়-সফটওয়্যার)
2. [Firebase প্রজেক্ট সেটআপ](#firebase-প্রজেক্ট-সেটআপ)
3. [Remove.bg API Key পাওয়া](#removebg-api-key-পাওয়া)
4. [লোকাল সেটআপ](#লোকাল-সেটআপ)
5. [Firebase Configuration](#firebase-configuration)
6. [Deployment](#deployment)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## প্রয়োজনীয় সফটওয়্যার

নিম্নলিখিত সফটওয়্যার ইনস্টল করুন:

### 1. Node.js এবং npm
```bash
# Node.js 18+ ডাউনলোড করুন
https://nodejs.org/

# Version যাচাই করুন
node --version  # v18.0.0 বা তার বেশি হতে হবে
npm --version
```

### 2. Firebase CLI
```bash
# Firebase CLI ইনস্টল করুন
npm install -g firebase-tools

# Version যাচাই করুন
firebase --version
```

### 3. Git (Optional)
```bash
# Git ইনস্টল করুন
https://git-scm.com/downloads

# Version যাচাই করুন
git --version
```

---

## Firebase প্রজেক্ট সেটআপ

### ধাপ ১: Firebase Console-এ প্রজেক্ট তৈরি করুন

1. **Firebase Console-এ যান:**
   - https://console.firebase.google.com/
   - Google অ্যাকাউন্ট দিয়ে লগইন করুন

2. **নতুন প্রজেক্ট তৈরি করুন:**
   - "Add project" ক্লিক করুন
   - প্রজেক্টের নাম দিন: `lumi-bg-remove` (বা আপনার পছন্দের নাম)
   - Google Analytics সক্রিয় করুন (Optional)
   - "Create project" ক্লিক করুন

### ধাপ ২: Authentication সক্রিয় করুন

1. **Authentication সেটআপ:**
   ```
   Firebase Console > Build > Authentication > Get Started
   ```

2. **Sign-in Methods সক্রিয় করুন:**
   - Email/Password → Enable করুন
   - (Optional) Google Sign-In → Enable করুন

### ধাপ ৩: Firestore Database তৈরি করুন

1. **Firestore সেটআপ:**
   ```
   Firebase Console > Build > Firestore Database > Create database
   ```

2. **Security Mode নির্বাচন করুন:**
   - "Start in production mode" সিলেক্ট করুন
   - Location: `asia-south1` (Mumbai) বা `asia-southeast1` (Singapore)

3. **Security Rules আপডেট করুন:**
   - পরে আমরা custom rules deploy করব

### ধাপ ৪: Storage সক্রিয় করুন

1. **Storage সেটআপ:**
   ```
   Firebase Console > Build > Storage > Get Started
   ```

2. **Security Rules:**
   - "Start in production mode" সিলেক্ট করুন
   - Same location যা Firestore-এ ব্যবহার করেছেন

### ধাপ ৫: Firebase Functions সক্রিয় করুন

1. **Billing সক্রিয় করুন:**
   - Functions ব্যবহার করতে Blaze (Pay as you go) plan লাগবে
   - Firebase Console > Upgrade (left sidebar)
   - "Select plan" → "Blaze"
   - Payment method যোগ করুন

2. **Functions সেটআপ:**
   - Automatically enabled হয়ে যাবে

---

## Remove.bg API Key পাওয়া

### ধাপ ১: Remove.bg অ্যাকাউন্ট তৈরি করুন

1. **Remove.bg-তে যান:**
   - https://www.remove.bg/users/sign_up

2. **Sign up করুন:**
   - Email দিয়ে নিবন্ধন করুন
   - Email verify করুন

### ধাপ ২: API Key পান

1. **API Dashboard-এ যান:**
   - https://www.remove.bg/api

2. **API Key কপি করুন:**
   - "API Key" section থেকে key কপি করুন
   - এই key পরে লাগবে

### Free Tier Limits:
- 50 API calls/month বিনামূল্যে
- Preview quality images
- যথেষ্ট testing এর জন্য

---

## লোকাল সেটআপ

### ধাপ ১: Repository Clone করুন

```bash
git clone https://github.com/deshicart/lumi-bg-remove.git
cd lumi-bg-remove
```

### ধাপ ২: Frontend Setup

```bash
# Frontend directory-তে যান
cd frontend

# Dependencies ইনস্টল করুন
npm install

# Environment variables সেটআপ করুন
cp .env.example .env
```

### ধাপ ৩: Frontend .env ফাইল এডিট করুন

`.env` ফাইল খুলুন এবং Firebase credentials যোগ করুন:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Firebase Credentials পাওয়া:**
1. Firebase Console > Project Settings (⚙️ icon)
2. "Your apps" section-এ scroll করুন
3. Web app (<>) যোগ করুন যদি না থাকে
4. Config values কপি করুন

### ধাপ ৪: Backend Setup

```bash
# Backend directory-তে যান
cd ../backend/functions

# Dependencies ইনস্টল করুন
npm install
```

### ধাপ ৫: Firebase Login

```bash
# Root directory-তে ফিরে যান
cd ../..

# Firebase-এ login করুন
firebase login

# Project initialize করুন
firebase use --add
# আপনার Firebase project সিলেক্ট করুন
# Alias দিন: default
```

### ধাপ ৬: Remove.bg API Key Configure করুন

```bash
# Firebase Functions config-এ API key যোগ করুন
firebase functions:config:set removebg.apikey="YOUR_REMOVE_BG_API_KEY"

# Config verify করুন
firebase functions:config:get
```

---

## Firebase Configuration

### Security Rules Deploy করুন

```bash
# Firestore rules deploy করুন
firebase deploy --only firestore:rules

# Storage rules deploy করুন
firebase deploy --only storage:rules
```

### Firestore Indexes (যদি প্রয়োজন হয়)

```bash
firebase deploy --only firestore:indexes
```

---

## Development

### Local Development Server চালান

```bash
# Frontend development server
cd frontend
npm run dev
```

ব্রাউজারে খুলুন: http://localhost:3000

### Firebase Functions Emulator (Optional)

```bash
# Functions locally test করতে
firebase emulators:start
```

---

## Deployment

### ধাপ ১: Frontend Build করুন

```bash
cd frontend
npm run build
```

এটি `frontend/dist` directory তৈরি করবে।

### ধাপ ২: Firebase-এ Deploy করুন

```bash
# Root directory থেকে
cd ..

# সব কিছু deploy করুন
firebase deploy

# অথবা আলাদা আলাদা deploy করুন:
firebase deploy --only hosting        # শুধু frontend
firebase deploy --only functions       # শুধু backend
firebase deploy --only firestore:rules # শুধু Firestore rules
firebase deploy --only storage:rules   # শুধু Storage rules
```

### ধাপ ৩: Deployment Verify করুন

```bash
# Hosting URL পাবেন:
# https://your-project.web.app
# বা
# https://your-project.firebaseapp.com
```

ব্রাউজারে খুলে test করুন।

---

## Testing

### Frontend Testing

1. **Authentication:**
   - Sign up with email/password
   - Login
   - Logout

2. **Image Upload:**
   - Upload JPG, PNG, WEBP images
   - Test file size validation (>10MB)
   - Test format validation

3. **Background Removal:**
   - Upload an image
   - Wait for processing
   - Check before/after comparison
   - Download processed image

4. **Usage Limits:**
   - Test daily limit (10 free)
   - Test ad watch system
   - Check usage reset at midnight

### Backend Testing

1. **Firebase Functions:**
   ```bash
   # Functions logs দেখুন
   firebase functions:log
   ```

2. **Firestore:**
   - Firebase Console > Firestore Database
   - Check `users`, `usage` collections

3. **Storage:**
   - Firebase Console > Storage
   - Check `processed/` folder

---

## Troubleshooting

### সাধারণ সমস্যা এবং সমাধান

#### 1. Firebase Functions এ 403 Error

**সমস্যা:** Functions call করলে "permission denied" error

**সমাধান:**
```bash
# Ensure user is authenticated
# Check Firestore rules are deployed
firebase deploy --only firestore:rules
```

#### 2. Remove.bg API Error

**সমস্যা:** "API key not configured" বা "Invalid API key"

**সমাধান:**
```bash
# API key পুনরায় set করুন
firebase functions:config:set removebg.apikey="YOUR_KEY"

# Functions redeploy করুন
firebase deploy --only functions
```

#### 3. Image Upload করা যাচ্ছে না

**সমস্যা:** Storage-এ upload হচ্ছে না

**সমাধান:**
- Storage rules check করুন
- User authenticated কিনা verify করুন
- File size এবং type check করুন

#### 4. Build Errors

**সমস্যা:** `npm run build` failed

**সমাধান:**
```bash
# Dependencies পুনরায় ইনস্টল করুন
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 5. Functions Deployment Failed

**সমস্যা:** Functions deploy করতে সমস্যা

**সমাধান:**
```bash
# Node version check করুন (18+ হতে হবে)
node --version

# Functions dependencies ইনস্টল করুন
cd backend/functions
npm install
cd ../..

# Deploy again
firebase deploy --only functions
```

---

## Environment Variables চেকলিস্ট

### Frontend (.env)
- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`

### Backend (Firebase Functions Config)
- [ ] `removebg.apikey`

---

## Deployment চেকলিস্ট

- [ ] Firebase project created
- [ ] Authentication enabled
- [ ] Firestore database created
- [ ] Storage enabled
- [ ] Billing enabled (Blaze plan)
- [ ] Remove.bg API key obtained
- [ ] Frontend .env configured
- [ ] Backend API key configured
- [ ] Security rules deployed
- [ ] Frontend built
- [ ] Functions deployed
- [ ] Hosting deployed
- [ ] Application tested

---

## Production Considerations

### Performance
- Enable Firebase Performance Monitoring
- Use CDN for static assets
- Optimize images before upload

### Security
- Rotate API keys regularly
- Monitor usage logs
- Set up alerts for suspicious activity

### Monitoring
- Enable Firebase Crashlytics
- Set up error tracking
- Monitor Functions execution

### Backup
- Regular Firestore backups
- Storage bucket backup policy

---

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Remove.bg API Docs](https://www.remove.bg/api)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## সাহায্য চান?

যদি কোন সমস্যা হয়:

1. [GitHub Issues](https://github.com/deshicart/lumi-bg-remove/issues) খুলুন
2. README.md দেখুন
3. Firebase Console logs চেক করুন

---

**সেটআপ সম্পন্ন! 🎉**

এখন আপনি Lumi Bg Remove ব্যবহার করতে পারবেন। আরও তথ্যের জন্য README.md দেখুন।
