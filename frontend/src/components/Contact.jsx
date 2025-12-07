import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';


import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';


const Contact = () => {

  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.email || !form.message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/contact`, {
        name: form.name,
        email: form.email,
        message: form.message,
      });

      // console.log("Contact form submitted:", res.data);
      setLoading(false);
      alert("✅ Thank you. I will get back to you as soon as possible.");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.error("❌ EmailJS Error:", error);
      alert("Ahh, something went wrong. Please try again.");
    }
  };

  return (
    <div className='lg:mt-12 lg:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-[#100d25] p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>
          Get in touch
        </p>

        <h3 className={styles.heroHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type="text"
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-[#151030] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outlined-none border-none font-medium '
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type="email"
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className='bg-[#151030] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outlined-none border-none font-medium '
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows="7"
              type="text"
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className='bg-[#151030] py-4 px-6 placeholder:text-[#aaa6c3] text-white rounded-lg outlined-none border-none font-medium '
            />
          </label>

          <button
            type='submit'
            className='bg-[#151030] py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-[#050816] rounded-xl cursor-pointer'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='lg:flex-1 lg:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
}

export default SectionWrapper(Contact, "contact");