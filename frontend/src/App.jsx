import React from 'react';
import { BrowserRouter } from 'react-router-dom';


import { About, Contact, Experience, Feedbacks, Hero, Navbar, StarsCanvas, Tech, Works } from './components'
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-center bg-no-repeat bg-cover bg-hero-pattern'>
          <Navbar/>
          <Hero/>
        </div>
        <About/>
        {/* <Experience/> */}
        <Tech/>
        <Works/>
        {/* <Feedbacks/> */}
        <div className='relative z-0'>
          <Contact/>
          <StarsCanvas/>
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  )
}
