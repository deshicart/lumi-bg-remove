import React, { useState } from 'react';
import { downloadImage } from '../services/api';

const ImageComparison = ({ originalImage, processedImage, onNewImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleDownload = () => {
    const filename = `lumi-bg-removed-${Date.now()}.png`;
    downloadImage(processedImage, filename);
  };

  return (
    <div className="fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">ফলাফল দেখুন</h2>
          <p className="text-white/80">স্লাইডার টেনে আগে ও পরের তুলনা করুন</p>
        </div>

        {/* Image Comparison Container */}
        <div className="glass-white p-4 rounded-2xl mb-6">
          <div
            className="relative overflow-hidden rounded-xl cursor-ew-resize select-none"
            style={{ aspectRatio: '16/9' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
          >
            {/* Processed Image (Background) */}
            <div className="absolute inset-0 bg-gray-100">
              <img
                src={processedImage}
                alt="Processed"
                className="w-full h-full object-contain"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                পরে
              </div>
            </div>

            {/* Original Image (Foreground with clip) */}
            <div
              className="absolute inset-0 bg-white"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-full object-contain"
                draggable={false}
              />
              <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                আগে
              </div>
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Slider Instruction */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              স্লাইডার টেনে আগে ও পরের তুলনা করুন
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>ডাউনলোড করুন</span>
          </button>

          <button
            onClick={onNewImage}
            className="btn-secondary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>নতুন ছবি</span>
          </button>
        </div>

        {/* Tips */}
        <div className="glass p-6 rounded-2xl mt-6">
          <h3 className="text-white font-semibold text-lg mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            সহায়ক তথ্য
          </h3>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ছবি PNG ফরম্যাটে ডাউনলোড হবে যাতে ব্যাকগ্রাউন্ড ট্রান্সপারেন্ট থাকে
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              উচ্চ মানের ছবির জন্য ভালো লাইটিং এবং ক্লিয়ার ব্যাকগ্রাউন্ড ব্যবহার করুন
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              প্রতিদিন ১০টি বিনামূল্যে ব্যবহার করতে পারবেন
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;
