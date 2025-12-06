import React from 'react'
import { gitHub } from '../assets';
import { linkedIn } from '../assets';

export default function Footer() {
    return (
        <div className='flex justify-center items-center py-2 flex-col'>
            <div>Powered By © <span className="font-semibold text-[#915eff]">Ashish Khopde</span></div>
            <div className='flex justify-center items-center'>
                <p
                    className='flex justify-center items-center cursor-pointer'
                    onClick={()=>{
                        window.open("https://www.linkedin.com/in/ashish-khopde-2a3680372/");
                    }}
                >
                    <img src={linkedIn} alt="linkedIn" className='w-8 h-8 mr-1' />LinkedIn
                </p>
                <p className='mx-3 text-xl'>|</p>
                <p
                    className='flex justify-center items-center cursor-pointer'
                    onClick={()=>{
                        window.open("https://github.com/ashishkhopde");
                    }}
                >
                    <img src={gitHub} alt="gitHub" className='w-8 h-8 mr-1' />GitHub
                </p>
            </div>
        </div>
    )
}
