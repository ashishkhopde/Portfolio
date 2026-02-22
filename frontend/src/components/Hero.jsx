import React, { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
const ComputersCanvas = lazy(() => import('./canvas/Computers'));

const canUseWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Swallow WebGL runtime crashes and show fallback UI instead of a blank page.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const HeroFallback = () => (
  <div className='absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_30%,rgba(145,94,255,0.25),rgba(5,8,22,0.95)_45%)]' />
);

const Hero = () => {
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      setShouldRenderCanvas(false);
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setShouldRenderCanvas(!isMobile && canUseWebGL());
  }, []);

  return (
    <section className='relative w-full h-screen mx-auto overflow-hidden'>
      <div className='absolute inset-0'>
        {shouldRenderCanvas ? (
          <CanvasErrorBoundary fallback={<HeroFallback />}>
            <Suspense fallback={<HeroFallback />}>
              <ComputersCanvas />
            </Suspense>
          </CanvasErrorBoundary>
        ) : (
          <HeroFallback />
        )}
      </div>

      <div className={`${styles.paddingX} pointer-events-none absolute inset-0 top-[120px] z-10 max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col items-center justify-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 h-40 sm:h-80 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915eff]'>Ashish</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop 3D visuals, user <br className='hidden sm:block' /> interfaces and web applications
          </p>
        </div>
      </div>

      <div className='pointer-events-none absolute xs:bottom-10 bottom-1 z-10 w-full flex justify-center items-center'>
        <a href='#about' className='pointer-events-auto'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-[#aaa6c3] flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className='w-3 h-3 rounded-full bg-[#aaa6c3] mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
