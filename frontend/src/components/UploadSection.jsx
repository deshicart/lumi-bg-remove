import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadSection = ({ onImageUpload, isProcessing, user }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.file.size > 10 * 1024 * 1024) {
        alert('ফাইল সাইজ ১০ MB এর বেশি হতে পারবে না');
      } else {
        alert('শুধুমাত্র JPG, PNG, WEBP ফরম্যাট সমর্থিত');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload file
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: isProcessing || !user
  });

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          ব্যাকগ্রাউন্ড রিমুভ করুন
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          সহজে এবং বিনামূল্যে আপনার ছবির ব্যাকগ্রাউন্ড সরান
        </p>
      </div>

      {/* Upload Area */}
      <div className="max-w-2xl mx-auto">
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'dropzone-active' : ''} ${
            !user ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <input {...getInputProps()} />
          
          {isProcessing ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="spinner"></div>
              <p className="text-white text-lg font-semibold">প্রসেস করা হচ্ছে...</p>
              <p className="text-white/70 text-sm">অনুগ্রহ করে অপেক্ষা করুন</p>
            </div>
          ) : !user ? (
            <div className="flex flex-col items-center space-y-4">
              <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-white text-lg font-semibold">
                অনুগ্রহ করে প্রথমে লগইন করুন
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              {/* Upload Icon */}
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              {/* Text */}
              <div className="text-center">
                <p className="text-white text-xl font-semibold mb-2">
                  {isDragActive ? 'এখানে ছাড়ুন...' : 'ছবি আপলোড করুন'}
                </p>
                <p className="text-white/70 text-sm mb-4">
                  এখানে ছবি ড্র্যাগ করুন বা ক্লিক করুন
                </p>
                <button className="btn-primary inline-flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>ফাইল নির্বাচন করুন</span>
                </button>
              </div>

              {/* Supported Formats */}
              <div className="text-center">
                <p className="text-white/60 text-sm">
                  সমর্থিত ফরম্যাট: JPG, PNG, WEBP
                </p>
                <p className="text-white/60 text-xs mt-1">
                  সর্বোচ্চ সাইজ: ১০ MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="glass p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">দ্রুত প্রসেসিং</h3>
            <p className="text-white/70 text-sm">মাত্র কয়েক সেকেন্ডে সম্পন্ন</p>
          </div>

          <div className="glass p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">সুরক্ষিত</h3>
            <p className="text-white/70 text-sm">আপনার ছবি সুরক্ষিত</p>
          </div>

          <div className="glass p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">উচ্চ মানের</h3>
            <p className="text-white/70 text-sm">HD কোয়ালিটি আউটপুট</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
