"use client";

import React, { useEffect, useState } from 'react';
import { TwitterCard } from './ui/twitter-card';
import { motion, AnimatePresence } from 'framer-motion';
import { Variants } from "framer-motion";

const TwitterCardsGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardsPerPage = 9; // 3x3 grid
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [tweetUrl, setTweetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // All Twitter cards data
  const [allTweets, setAllTweets] = useState([
    {
      username: "Kanishk Khurana",
      handle: "KanishkKhurana_",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Thank fucking god someone made this. You're the best 💯",
      verified: true,
      tweetUrl: "https://twitter.com/KanishkKhurana_/status/1234567890"
    },
    {
      username: "Whop",
      handle: "WhopIO",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      content: "you heard right. that looks amazing 🍓",
      verified: true,
      tweetUrl: "https://twitter.com/WhopIO/status/1234567891"
    },
    {
      username: "Steven Tey",
      handle: "steventey",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      content: "bruh this is so good 😊",
      verified: true,
      tweetUrl: "https://twitter.com/steventey/status/1234567892"
    },
    {
      username: "Amritpal Chera",
      handle: "achera23",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      content: "This looks crazyy good! Congrats on the launch",
      verified: true,
      tweetUrl: "https://twitter.com/achera23/status/1234567893"
    },
    {
      username: "jordi",
      handle: "jordienr",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      content: "This is awesome 👍",
      verified: true,
      tweetUrl: "https://twitter.com/jordienr/status/1234567894"
    },
    {
      username: "Ben Everman",
      handle: "beneverman",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      content: "Sick dude. Can't wait to build with these once they're all done",
      verified: true,
      tweetUrl: "https://twitter.com/beneverman/status/1234567895"
    },
    {
      username: "Raduan Al-Shedivat",
      handle: "0xRaduan",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      content: "just bought one, love it.",
      verified: true,
      tweetUrl: "https://twitter.com/0xRaduan/status/1234567896"
    },
    {
      username: "Yazin",
      handle: "yazinsai",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Ordered, can't wait to try this out @dilionverma!",
      verified: true,
      tweetUrl: "https://twitter.com/yazinsai/status/1234567897"
    },
    // Generate additional tweets
    ...Array.from({ length: 30 }, (_, i) => ({
      username: `User ${i + 9}`,
      handle: `user${i + 9}`,
      avatar: `https://randomuser.me/api/portraits/men/${(i + 10) % 70}.jpg`,
      content: `This is tweet number ${i + 9}. This component from sonnet UI is amazing`,
      verified: true,
      tweetUrl: `https://twitter.com/user${i + 9}/status/${1234567898 + i}`
    }))
  ]);

  // Add a new tweet from URL
  const addTweetFromUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validate URL format
      if (!tweetUrl.includes('twitter.com') && !tweetUrl.includes('x.com')) {
        throw new Error('Please enter a valid Twitter URL');
      }

      // Extract tweet ID (this is a simplified version)
      const urlParts = tweetUrl.split('/');
      const tweetId = urlParts[urlParts.length - 1].split('?')[0];
      
      if (!tweetId || tweetId.length < 5) {
        throw new Error('Could not extract a valid tweet ID from the URL');
      }

      // In a real application, you would fetch the tweet data from Twitter API
      // For demo purposes, we'll simulate a network request and create mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock tweet based on the URL
      const newTweet = {
        username: `Twitter User ${Math.floor(Math.random() * 1000)}`,
        handle: `user${tweetId.substring(0, 5)}`,
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 70)}.jpg`,
        content: `This is a dynamically added tweet with ID: ${tweetId}. In a real application, this would contain the actual tweet content from the Twitter API.`,
        verified: true,
        tweetUrl: tweetUrl
      };
      
      // Add the new tweet to the beginning of our array
      setAllTweets(prev => [newTweet, ...prev]);
      
      // Reset form
      setTweetUrl('');
      
      // Show success feedback
      alert('Tweet added successfully! You can now see it in the rotation.');
      
      // Auto-hide the input form
      setShowInput(false);
      
    } catch (err: any) {
      setError(err.message || 'Failed to add tweet');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial visible set
    setIsVisible(true);
    setVisibleCards(Array.from({ length: cardsPerPage }, (_, i) => i));

    // Set up the interval for scrolling
    const scrollInterval = setInterval(() => {
      // Remove the oldest card and add a new one
      setCurrentStartIndex(prev => {
        const nextIndex = (prev + 1) % allTweets.length;
        setVisibleCards(current => {
          // Remove first index and add the next in sequence
          const newVisibleCards = [...current.slice(1)];
          
          const nextCardIndex = (prev + cardsPerPage) % allTweets.length;
          newVisibleCards.push(nextCardIndex);
          
          return newVisibleCards;
        });
        return nextIndex;
      });
    }, 3000); // Slightly slower for a more natural scroll effect

    return () => clearInterval(scrollInterval);
  }, [allTweets.length]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Title text animation variants
const titleVariants: Variants = {
  initial: {
    y: -20,
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },

  hover: {
    scale: 1.05,
    textShadow: "0px 0px 8px rgba(155, 107, 254, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

  // Define card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      scale: 0.98,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`absolute -z-10 -top-24 -bottom-24 left-0 right-0 ${darkMode ? 'bg-gradient-to-b from-gray-900/20 to-black' : 'bg-gradient-to-b from-blue-50 to-white'} opacity-70`}></div>
          
          <div className="relative z-10">
            {/* Title and Description */}
            <div className="flex flex-col items-center mb-12 text-center">
              <motion.h1 
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-400"
                variants={titleVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                "Digital Euphoria"
              </motion.h1>
              
              <motion.p 
                className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Interactive Twitter card showcase that transforms user feedback into an engaging, animated social proof display.
              </motion.p>
              
              {/* Social Links and Theme Toggle */}
              <div className="flex space-x-6 mt-6">
                <motion.a 
                  href="https://github.com/saaxena/Twitter-card" 
                  className={`rounded-full p-2 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="https://x.com/" 
                  className={`rounded-full p-2 ${darkMode ? 'bg-gray-800 text-[#1da1f2] hover:bg-gray-700' : 'bg-gray-100 text-[#1da1f2] hover:bg-gray-200'} transition-colors`}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
                
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`rounded-full p-2 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <motion.div 
                className="flex justify-center relative cursor-pointer mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInput(prev => !prev)}
              >
                <motion.div 
                  className="w-16 h-16 bg-[#1da1f2] rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                  animate={{ rotate: showInput ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Subtle ripple effect */}
                  <motion.div
                    className="absolute inset-0 border-4 border-white rounded-full opacity-30"
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: [0.8, 1.15, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <svg className="w-8 h-8 text-white z-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.div>
              </motion.div>
              
              <AnimatePresence>
                {showInput && (
                  <motion.div
                    className="w-full max-w-md mb-8"
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} rounded-xl shadow-lg p-6 border`}>
                      <div className="flex items-center justify-center mb-4">
                        <svg className="w-7 h-7 text-[#1da1f2] mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add Your Twitter Feedback</h2>
                      </div>

                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center mb-4`}>
                        Share your thoughts by adding a link to your tweet
                      </p>

                      <form onSubmit={addTweetFromUrl}>
                        <div className="relative mb-4">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className={`w-5 h-5 text-[#1da1f2]`} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                          </div>
                          <input
                            className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border text-sm rounded-lg block w-full pl-10 p-3 focus:ring-[#1da1f2] focus:border-[#1da1f2]`}
                            type="text"
                            placeholder="https://twitter.com/username/status/123..."
                            value={tweetUrl}
                            onChange={(e) => setTweetUrl(e.target.value)}
                            aria-label="Tweet URL"
                          />
                        </div>

                        {error && (
                          <motion.p
                            className="text-red-500 text-sm mb-4 text-center"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {error}
                          </motion.p>
                        )}

                        <motion.button
                          className="w-full flex items-center justify-center bg-[#1da1f2] hover:bg-[#1a91da] text-white font-medium rounded-full py-3 px-5"
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                              </svg>
                              Submit Tweet
                            </>
                          )}
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative overflow-hidden" style={{ minHeight: '600px' }}>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={container}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleCards.map((tweetIndex, gridIndex) => (
                    <motion.div 
                      key={`${tweetIndex}-${currentStartIndex+gridIndex}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                          delay: gridIndex * 0.08
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -40,
                        transition: {
                          duration: 0.4,
                          ease: "easeIn"
                        }
                      }}
                      className={`${gridIndex % 3 === 0 ? 'row-span-1' : gridIndex % 3 === 1 ? 'row-span-1 h-full' : 'row-span-1'}`}
                    >
                      <TwitterCard
                        username={allTweets[tweetIndex].username}
                        handle={allTweets[tweetIndex].handle}
                        avatar={allTweets[tweetIndex].avatar}
                        content={allTweets[tweetIndex].content}
                        verified={true}
                        index={gridIndex}
                        tweetUrl={allTweets[tweetIndex].tweetUrl}
                        className={`h-full ${darkMode ? 'bg-gray-900 border-gray-800 text-white' : ''}`}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className={`py-6 ${darkMode ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'} border-t mt-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Built with React, TypeScript, and Framer Motion by @saxenaa
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TwitterCardsGrid; 