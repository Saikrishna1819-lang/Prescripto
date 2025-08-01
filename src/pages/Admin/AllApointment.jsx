import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllApointment = () => {
  const {aToken,appointments,getAllAppointments,appointmentCancel}=useContext(AdminContext)
  const {calculateAge,currency,slotDateFormat}=useContext(AppContext)
  
  console.log(aToken)
  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }

  },[aToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border border-gray-300 rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item,index)=>(
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] item-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-300 transition-all duration-300'>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full ' src={item.userData.image} alt=""></img>
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
             <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-300 ' src={item.docData.image} alt=""></img>
              <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled?
              <p className='text-red-400 text-xs font-medium'>Cancelled</p>:
              <img onClick={()=>{appointmentCancel(item._id)}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt=""></img>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllApointment