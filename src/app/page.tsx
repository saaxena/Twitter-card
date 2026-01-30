import TwitterCardWrapper from '@/components/twitter-card-wrapper';

export default function Home() {
  // We'll handle dark mode in the TwitterCardWrapper component now
  return (
    <div className="min-h-screen">
      <main>
        <TwitterCardWrapper />
      </main>
    </div>
  );
}
