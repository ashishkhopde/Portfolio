import React, { Suspense, lazy, useEffect, useState } from 'react';
import { SectionWrapper } from '../hoc';
import { technologies } from '../contants';

const BallCanvas = lazy(() => import('./canvas/Ball'));

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }

    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          {isMobile ? (
            <div className='w-full h-full rounded-full bg-[#151030] p-4 flex items-center justify-center'>
              <img
                src={technology.icon}
                alt={technology.name}
                className='w-14 h-14 object-contain'
                loading='lazy'
                decoding='async'
              />
            </div>
          ) : (
            <Suspense fallback={<div className='w-full h-full rounded-full bg-[#151030]' />}>
              <BallCanvas icon={technology.icon} />
            </Suspense>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, '');
