import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';


import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from './components'
import Footer from './components/Footer';
import ClientWork from './components/ClientWork';
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));

export default function App() {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setShowStars(!mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setShowStars(!event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }

    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-center bg-no-repeat bg-cover bg-hero-pattern'>
          <Navbar />
          <Hero />
        </div>
        <About />
        {/* <Experience/> */}
        <Tech />
        <Works />
        <ClientWork />
        {/* <Feedbacks/> */}
        <div className='relative z-0'>
          <Contact />
          {showStars ? (
            <Suspense fallback={null}>
              <StarsCanvas />
            </Suspense>
          ) : null}
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
