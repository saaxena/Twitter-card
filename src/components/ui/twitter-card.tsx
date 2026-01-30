"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface TwitterCardProps {
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp?: string;
  likes?: number;
  retweets?: number;
  comments?: number;
  verified?: boolean;
  className?: string;
  index?: number;
  tweetUrl?: string;
}

export const TwitterCard = ({
  username,
  handle,
  avatar,
  content,
  timestamp,
  likes = 0,
  retweets = 0,
  comments = 0,
  verified = false,
  className,
  index = 0,
  tweetUrl,
}: TwitterCardProps) => {
  
  const handleCardClick = () => {
    if (tweetUrl) {
      window.open(tweetUrl, '_blank');
    }
  };
  
  // Determine if the component is in dark mode based on the className prop
  const isDarkMode = className?.includes('bg-gray-900') || false;
  
  // Generate a subtle random rotation for more organic look
  const randomRotation = useMemo(() => {
    return (Math.random() * 2 - 1) * 1; // Between -1 and 1 degrees
  }, []);

  // Generate a subtle random scale variation
  const randomScale = useMemo(() => {
    return 0.98 + Math.random() * 0.04; // Between 0.98 and 1.02
  }, []);
  
  return (
    <motion.div
      className={`rounded-xl shadow-md overflow-hidden w-full h-full border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} ${tweetUrl ? 'cursor-pointer' : ''} ${className}`}
      whileHover={{ 
        y: -8,
        rotate: 0,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 }
      }}
      style={{ 
        rotate: randomRotation,
        scale: randomScale
      }}
      onClick={handleCardClick}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-start mb-2">
          <div className="flex-shrink-0 mr-3">
            <motion.div 
              className="relative h-10 w-10 rounded-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
            >
              <Image
                src={avatar}
                alt={`${username}'s profile`}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <motion.p 
                className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate flex items-center`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              >
                {username}
                {verified && (
                  <motion.span 
                    className="ml-1 text-[#1da1f2]"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.4, times: [0, 0.6, 1] }}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                    </svg>
                  </motion.span>
                )}
              </motion.p>
              <motion.p 
                className={`ml-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
              >
                @{handle}
              </motion.p>
            </div>
            <motion.p 
              className={`mt-1 text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} flex-grow`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
            >
              {content}
            </motion.p>
          </div>
        </div>
        <motion.div 
          className={`mt-auto pt-3 flex items-center space-x-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 + index * 0.05, duration: 0.4 }}
        >
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.1, color: "#1da1f2" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.1, color: "#17bf63" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.1, color: "#e0245e" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.1, color: "#1da1f2" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TwitterCard; 