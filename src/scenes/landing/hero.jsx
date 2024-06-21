import React from 'react';
import useTypewriter from './useTypewriter'; // Adjust the import path as necessary

const Hero = () => {
    const typedText = useTypewriter(['PM', 'Developer', 'Anyone'], 120, 140, 1000);

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
                    <span className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'>
                        {typedText}
                    </span>
                </div>
                <p className='md:text-2xl text-xl font-bold text-gray-500'>Knowing what to do matters than how to do it.</p>
                {/* <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Input your Idea</button> */}
            </div>
        </div>
    );
};

export default Hero;
