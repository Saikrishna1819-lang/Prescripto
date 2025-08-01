import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold '>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image}></img>
        <div className='flex flex-col gap-6 justify-center items-start'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE  </p>
          <p className='text-gray-500'>Tuni  <br/>Visakhapatnam, Andhra Pradesh, India</p>
         
          <p className='text-gray-500'>Tel:+91 7995858373 <br/> Email: krishnasai69219@gmail.com</p>
          <p className='text-gray-600 font-semibold text-lg'>CAREERS AT PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 '>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact