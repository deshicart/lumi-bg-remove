# 🎨 Lumi Bg Remove

**বাংলাদেশের জন্য তৈরি বিনামূল্যে ব্যাকগ্রাউন্ড রিমুভ সেবা**

একটি সম্পূর্ণ আধুনিক ওয়েব অ্যাপ্লিকেশন যা আপনার ছবির ব্যাকগ্রাউন্ড সহজে এবং বিনামূল্যে সরিয়ে দেয়।

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Firebase](https://img.shields.io/badge/Firebase-Ready-orange.svg)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)

## ✨ বৈশিষ্ট্য

- 🎯 **সম্পূর্ণ বাংলা UI** - পুরো ইন্টারফেস বাংলা ভাষায়
- 🎨 **আধুনিক ডিজাইন** - Glassmorphism এবং গ্রেডিয়েন্ট ডিজাইন
- 📱 **মোবাইল-বান্ধব** - সব ডিভাইসে কাজ করে
- 🔐 **সুরক্ষিত** - Firebase Authentication এবং সিকিউরিটি রুলস
- 🆓 **বিনামূল্যে** - প্রতিদিন ১০টি বিনামূল্যে ব্যবহার
- 📺 **বিজ্ঞাপন সিস্টেম** - বিজ্ঞাপন দেখে আরও ব্যবহার পান
- ⚡ **দ্রুত প্রসেসিং** - কয়েক সেকেন্ডেই ফলাফল
- 🖼️ **উচ্চ মানের** - HD কোয়ালিটি PNG আউটপুট

## 🚀 দ্রুত শুরু

### প্রয়োজনীয় সফটওয়্যার

- Node.js 18+ এবং npm
- Firebase CLI
- Remove.bg API Key (বিনামূল্যে নিবন্ধন করুন)

### ইন্সটলেশন

1. **Repository Clone করুন:**
```bash
git clone https://github.com/deshicart/lumi-bg-remove.git
cd lumi-bg-remove
```

2. **Frontend Setup:**
```bash
cd frontend
npm install
cp .env.example .env
# .env ফাইলে আপনার Firebase credentials যোগ করুন
```

3. **Backend Setup:**
```bash
cd backend/functions
npm install
```

4. **Firebase Setup:**
```bash
# Firebase login
firebase login

# Firebase project তৈরি করুন বা বিদ্যমান ব্যবহার করুন
firebase init

# Remove.bg API key কনফিগার করুন
firebase functions:config:set removebg.apikey="YOUR_API_KEY"
```

### উন্নয়ন সার্ভার চালান

```bash
cd frontend
npm run dev
```

ব্রাউজারে খুলুন: http://localhost:3000

## 📁 প্রজেক্ট স্ট্রাকচার

```
lumi-bg-remove/
├── frontend/              # React Frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # Firebase & API services
│   │   ├── App.jsx       # Main app component
│   │   └── App.css       # Global styles
│   ├── package.json
│   └── vite.config.js
├── backend/
│   └── functions/        # Firebase Functions
│       ├── index.js      # Cloud Functions
│       └── package.json
├── firebase.json         # Firebase configuration
├── firestore.rules       # Firestore security rules
├── storage.rules         # Storage security rules
├── README.md
└── SETUP.md             # বিস্তারিত সেটআপ গাইড
```

## 🔧 প্রযুক্তি

### Frontend
- React 18.2
- Vite (Build tool)
- Tailwind CSS
- Firebase SDK
- React Dropzone

### Backend
- Firebase Functions
- Firebase Authentication
- Cloud Firestore
- Cloud Storage
- Remove.bg API

## 📖 ব্যবহার

1. **নিবন্ধন/লগইন করুন** - ইমেইল দিয়ে অ্যাকাউন্ট তৈরি করুন
2. **ছবি আপলোড করুন** - JPG, PNG, বা WEBP ফরম্যাট (সর্বোচ্চ ১০ MB)
3. **ফলাফল দেখুন** - আগে/পরে তুলনা করুন
4. **ডাউনলোড করুন** - উচ্চ মানের PNG ফাইল পান

### দৈনিক সীমা
- প্রতিদিন ১০টি বিনামূল্যে ব্যবহার
- রাত ১২:০০ টায় রিসেট হয় (বাংলাদেশ সময়)
- বিজ্ঞাপন দেখে আরও ব্যবহার পান

## 🔐 নিরাপত্তা

- API keys শুধুমাত্র backend-এ সংরক্ষিত
- Firebase Authentication দিয়ে ব্যবহারকারী যাচাই
- Firestore এবং Storage সিকিউরিটি রুলস
- Rate limiting প্রয়োগ করা
- ফাইল টাইপ এবং সাইজ যাচাই

## 🚀 Deploy

### Firebase-এ Deploy করুন

```bash
# Frontend build করুন
cd frontend
npm run build

# Deploy করুন
firebase deploy
```

বিস্তারিত জানতে `SETUP.md` দেখুন।

## 📝 License

MIT License - বিস্তারিত দেখুন [LICENSE](LICENSE) ফাইলে

## 🤝 অবদান

Pull requests স্বাগতম! বড় পরিবর্তনের জন্য, অনুগ্রহ করে প্রথমে একটি issue খুলুন।

## 📞 যোগাযোগ

- Website: [লিংক যোগ করুন]
- Email: support@lumibgremove.com
- GitHub Issues: [Issues](https://github.com/deshicart/lumi-bg-remove/issues)

## 🙏 স্বীকৃতি

- [Remove.bg](https://www.remove.bg/) - Background removal API
- [Firebase](https://firebase.google.com/) - Backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React](https://reactjs.org/) - Frontend framework

---

**Made with ❤️ for Bangladesh**

© ২০২৬ Lumi Bg Remove. সর্বস্বত্ব সংরক্ষিত।