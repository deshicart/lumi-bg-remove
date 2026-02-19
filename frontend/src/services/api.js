import { httpsCallable } from 'firebase/functions';
import { functions, auth, db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Get current date in Bangladesh timezone (YYYY-MM-DD format)
const getBangladeshDate = () => {
  const options = { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit' };
  const parts = new Intl.DateTimeFormat('en-CA', options).format(new Date()).split('-');
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
};

// Get user's daily usage data
export const getUserUsage = async (userId) => {
  try {
    const today = getBangladeshDate();
    const usageRef = doc(db, 'usage', `${userId}_${today}`);
    const usageDoc = await getDoc(usageRef);

    if (usageDoc.exists()) {
      return usageDoc.data();
    } else {
      // Initialize usage for today
      const initialData = {
        userId,
        date: today,
        count: 0,
        adWatchCount: 0,
        lastUsed: serverTimestamp()
      };
      await setDoc(usageRef, initialData);
      return { ...initialData, count: 0, adWatchCount: 0 };
    }
  } catch (error) {
    console.error('Error getting usage:', error);
    throw new Error('ব্যবহার তথ্য পেতে ব্যর্থ হয়েছে');
  }
};

// Check if user can remove background
export const canRemoveBackground = async (userId) => {
  try {
    const usage = await getUserUsage(userId);
    const maxFree = 10;
    const totalAllowed = maxFree + (usage.adWatchCount || 0);
    const remaining = totalAllowed - (usage.count || 0);
    
    return {
      canUse: remaining > 0,
      remaining,
      count: usage.count || 0,
      adWatchCount: usage.adWatchCount || 0
    };
  } catch (error) {
    console.error('Error checking limit:', error);
    throw error;
  }
};

// Remove background from image
export const removeBackground = async (imageFile) => {
  try {
    if (!auth.currentUser) {
      throw new Error('অনুগ্রহ করে প্রথমে লগইন করুন');
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (imageFile.size > maxSize) {
      throw new Error('ফাইল সাইজ ১০ MB এর বেশি হতে পারবে না');
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(imageFile.type)) {
      throw new Error('শুধুমাত্র JPG, PNG, WEBP ফরম্যাট সমর্থিত');
    }

    // Check usage limit
    const usageCheck = await canRemoveBackground(auth.currentUser.uid);
    if (!usageCheck.canUse) {
      throw new Error('আজকের বিনামূল্যের সীমা শেষ হয়েছে। আরও ব্যবহার করতে বিজ্ঞাপন দেখুন।');
    }

    // Convert image to base64
    const base64 = await fileToBase64(imageFile);

    // Call Firebase Function
    const removeBackgroundFn = httpsCallable(functions, 'removeBackground');
    const result = await removeBackgroundFn({
      imageBase64: base64.split(',')[1], // Remove data:image/... prefix
      fileName: imageFile.name
    });

    return result.data;
  } catch (error) {
    console.error('Error removing background:', error);
    if (error.message) {
      throw error;
    }
    throw new Error('ছবি প্রসেস করতে ব্যর্থ হয়েছে');
  }
};

// Track ad watch
export const trackAdWatch = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error('অনুগ্রহ করে প্রথমে লগইন করুন');
    }

    const trackAdWatchFn = httpsCallable(functions, 'trackAdWatch');
    const result = await trackAdWatchFn();
    return result.data;
  } catch (error) {
    console.error('Error tracking ad watch:', error);
    throw new Error('বিজ্ঞাপন ট্র্যাক করতে ব্যর্থ হয়েছে');
  }
};

// Convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Download image
export const downloadImage = (imageUrl, filename) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename || `lumi-bg-removed-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Error messages in Bengali
export const errorMessages = {
  fileTooLarge: "ফাইল সাইজ ১০ MB এর বেশি হতে পারবে না",
  invalidFormat: "শুধুমাত্র JPG, PNG, WEBP ফরম্যাট সমর্থিত",
  dailyLimitReached: "আজকের বিনামূল্যের সীমা শেষ হয়েছে",
  loginRequired: "অনুগ্রহ করে প্রথমে লগইন করুন",
  networkError: "ইন্টারনেট সংযোগ ব্যর্থ হয়েছে",
  processingError: "ছবি প্রসেস করতে ব্যর্থ হয়েছে"
};
