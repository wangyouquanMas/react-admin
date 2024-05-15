import React, { useEffect, useRef } from 'react';
import { Typed } from 'react-typed';

const Hero = () => {
    const elRef = useRef(null); // Create a ref for the DOM element

    useEffect(() => {
        if (elRef.current) {
            const typed = new Typed(elRef.current, {
                strings: ['PM', 'Developer', 'Anyone'],
                typeSpeed: 120,
                backSpeed: 140,
                loop: true
            });

            return () => typed.destroy(); // Cleanup Typed instance on component unmount
        }
    }, []); // Empty dependency array to ensure this runs only once

    return (
        <div className='text-white'>
            <div className='max-w-[800px] mt-[-96px] w-full h-[53vh] mx-auto text-center flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold p-2'>
                    Emotion WITH DATA ANALYTICS
                </p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
                    Validate Your Idea.
                </h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-5xl w-full sm:text-4xl text-xl font-bold py-4'>
                        Fast, flexible Analysis for
                    </p>
                    {/* Ensure the span element is correctly referenced */}
                    <span ref={elRef} className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'></span>
                </div>
                <p className='md:text-2xl text-xl font-bold text-gray-500'>Knowing what to do matters than how to do it.</p>
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Input your Idea</button>
            </div>
        </div>
    );
};

export default Hero;
