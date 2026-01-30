"use client";

import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for the component that uses framer-motion
const TwitterCardsGrid = dynamic(
  () => import('@/components/twitter-cards-grid'),
  { ssr: false }
);

export default function TwitterCardWrapper() {
  return <TwitterCardsGrid />;
} 