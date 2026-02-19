const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const FormData = require('form-data');

admin.initializeApp();

// Helper function to get Bangladesh date
const getBangladeshDate = () => {
  const options = { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  return formatter.format(new Date());
};

// Remove Background Function
exports.removeBackground = functions.https.onCall(async (data, context) => {
  // 1. Check authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'অনুগ্রহ করে লগইন করুন');
  }

  const userId = context.auth.uid;
  
  try {
    // 2. Check daily limit
    const today = getBangladeshDate();
    const usageRef = admin.firestore().collection('usage').doc(`${userId}_${today}`);
    const usageDoc = await usageRef.get();
    
    let currentCount = 0;
    let adWatchCount = 0;
    
    if (usageDoc.exists) {
      const usageData = usageDoc.data();
      currentCount = usageData.count || 0;
      adWatchCount = usageData.adWatchCount || 0;
    }
    
    const maxFree = 10;
    const totalAllowed = maxFree + adWatchCount;
    
    if (currentCount >= totalAllowed) {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        'আজকের বিনামূল্যের সীমা শেষ হয়েছে। আরও ব্যবহার করতে বিজ্ঞাপন দেখুন।'
      );
    }
    
    // 3. Validate input
    if (!data.imageBase64) {
      throw new functions.https.HttpsError('invalid-argument', 'ছবি প্রদান করুন');
    }

    // 4. Process image with Remove.bg API
    // Note: In production, use actual Remove.bg API
    // For demo, we'll return a mock response
    const apiKey = functions.config().removebg?.apikey;
    
    let processedImageUrl;
    
    if (apiKey && apiKey !== 'YOUR_REMOVE_BG_API_KEY') {
      // Use actual Remove.bg API
      try {
        const formData = new FormData();
        formData.append('image_file_b64', data.imageBase64);
        formData.append('size', 'auto');
        
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
          headers: {
            'X-Api-Key': apiKey,
            ...formData.getHeaders()
          },
          responseType: 'arraybuffer',
          timeout: 30000
        });
        
        // Upload to Firebase Storage
        const bucket = admin.storage().bucket();
        const fileName = `processed/${userId}/${Date.now()}.png`;
        const file = bucket.file(fileName);
        
        await file.save(Buffer.from(response.data), {
          metadata: { 
            contentType: 'image/png',
            metadata: {
              userId: userId,
              processedAt: new Date().toISOString()
            }
          }
        });
        
        // Get signed URL
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: '03-01-2500'
        });
        
        processedImageUrl = url;
      } catch (apiError) {
        console.error('Remove.bg API error:', apiError);
        throw new functions.https.HttpsError('internal', 'ছবি প্রসেস করতে ব্যর্থ হয়েছে');
      }
    } else {
      // Mock response for demo (returns the same image)
      // In production, this should always use the real API
      processedImageUrl = `data:image/png;base64,${data.imageBase64}`;
    }
    
    // 5. Update usage count
    await usageRef.set({
      userId,
      date: today,
      count: currentCount + 1,
      adWatchCount,
      lastUsed: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    // 6. Update user's total removals
    const userRef = admin.firestore().collection('users').doc(userId);
    await userRef.set({
      totalRemovals: admin.firestore.FieldValue.increment(1),
      lastUsed: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    // 7. Return result
    return {
      success: true,
      imageUrl: processedImageUrl,
      remaining: totalAllowed - (currentCount + 1)
    };
    
  } catch (error) {
    console.error('Error in removeBackground:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'ছবি প্রসেস করতে ব্যর্থ হয়েছে');
  }
});

// Track Ad Watch Function
exports.trackAdWatch = functions.https.onCall(async (data, context) => {
  // Check authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'অনুগ্রহ করে লগইন করুন');
  }
  
  const userId = context.auth.uid;
  
  try {
    const today = getBangladeshDate();
    const usageRef = admin.firestore().collection('usage').doc(`${userId}_${today}`);
    
    // Increment ad watch count
    await usageRef.set({
      userId,
      date: today,
      adWatchCount: admin.firestore.FieldValue.increment(1),
      lastAdWatch: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    return { 
      success: true,
      message: 'বিজ্ঞাপন সফলভাবে ট্র্যাক করা হয়েছে'
    };
  } catch (error) {
    console.error('Error tracking ad watch:', error);
    throw new functions.https.HttpsError('internal', 'বিজ্ঞাপন ট্র্যাক করতে ব্যর্থ হয়েছে');
  }
});

// Get User Usage Function (optional)
exports.getUserUsage = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'অনুগ্রহ করে লগইন করুন');
  }
  
  const userId = context.auth.uid;
  
  try {
    const today = getBangladeshDate();
    const usageRef = admin.firestore().collection('usage').doc(`${userId}_${today}`);
    const usageDoc = await usageRef.get();
    
    if (usageDoc.exists()) {
      return usageDoc.data();
    } else {
      return {
        userId,
        date: today,
        count: 0,
        adWatchCount: 0
      };
    }
  } catch (error) {
    console.error('Error getting usage:', error);
    throw new functions.https.HttpsError('internal', 'ব্যবহার তথ্য পেতে ব্যর্থ হয়েছে');
  }
});
