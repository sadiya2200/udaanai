import { useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import { Navbar, type Page } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/components/Home';
import { GapFinder } from '@/components/GapFinder';
import { Roadmap } from '@/components/Roadmap';
import { Opportunities } from '@/components/Opportunities';
import { Dashboard } from '@/components/Dashboard';

function App() {
  const [page, setPage] = useState<Page>('home');

  const handleNavigate = (newPage: Page) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-navy-950">
        <Navbar currentPage={page} onNavigate={handleNavigate} />
        <main>
          {page === 'home' && <Home onNavigate={handleNavigate} />}
          {page === 'gap-finder' && <GapFinder onNavigate={handleNavigate} />}
          {page === 'roadmap' && <Roadmap onNavigate={handleNavigate} />}
          {page === 'opportunities' && <Opportunities onNavigate={handleNavigate} />}
          {page === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </AppProvider>
  );
}

export default App;
