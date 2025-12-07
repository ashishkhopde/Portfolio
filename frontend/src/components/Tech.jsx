import React, { useState } from 'react';
import axios from 'axios';

import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';

import { useEffect } from 'react';
import { technologies } from '../contants';


const Tech = () => {
  // const [technologies, setTechnologies] = useState([]);

  // useEffect(() => {
  //   const fetchTechnologies = async () => {
  //     try {
  //       const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/technologies`);
  //       setTechnologies(res.data);
  //     } catch (error) {
  //       console.error("Error fetching technologies:", error);
  //     }
  //   }
  //   fetchTechnologies();
  // }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
}
export default SectionWrapper(Tech, "")