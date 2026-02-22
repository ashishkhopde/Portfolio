import React, { useEffect, useMemo, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../contants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, isMobile }) => {
  const tiltOptions = useMemo(
    () => ({
      max: isMobile ? 12 : 35,
      scale: isMobile ? 1 : 1.02,
      speed: isMobile ? 280 : 420,
    }),
    [isMobile]
  );

  const cardContent = (
    <motion.div
      variants={fadeIn("right", "spring", index * (isMobile ? 0.2 : 0.5), 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div className='bg-[#151030] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
          loading='lazy'
          decoding='async'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  );

  if (isMobile) {
    return <div className='sm:w-[250px] w-full'>{cardContent}</div>;
  }

  return (
    <Tilt className='sm:w-[250px] w-full' options={tiltOptions}>
      {cardContent}
    </Tilt>
  );
};

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaQueryChange);
      return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }

    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I’m a passionate beginner web developer with a solid foundation in HTML, CSS, and JavaScript, along with hands-on experience in React, Redux, Tailwind CSS, Node.js, Express, and MongoDB. I also have working knowledge of Git and GitHub for version control and collaboration. Focused on becoming a frontend developer, I enjoy building responsive, user-friendly interfaces and continuously improving my skills. Eager to learn, adapt, and contribute, I’m excited to work on real-world projects that make an impact while growing my expertise in modern web development.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} isMobile={isMobile} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
