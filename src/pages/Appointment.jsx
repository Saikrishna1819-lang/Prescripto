import React, { useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
const Appointment = () => {
  const {docId}=useParams();
  const navigate=useNavigate()
  const {doctors,currencySymbol,backendUrl,token,getDoctorsData}=useContext(AppContext)
  const [docInfo,setDocInfo]=useState(null)
  const [docSlots,setDocSlots]=useState([])
  const [slotTime,setslotTime]=useState('')
  const [slotIndex,setSlotIndex]=useState(0);
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']

  const bookAppointment=async()=>{
    if(!token){
      toast.warn("Login to book an appointment")
      return navigate('/login')
    }
    try{
      const date=docSlots[slotIndex][0].datetime
      let day=date.getDate()
      let month=date.getMonth()+1
      let year=date.getFullYear()
      const slotDate=day+"_"+month+"_"+year
      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }
      else
      {
        toast.error(data.message)
      }
    

    }catch(error){
      console.log(error.message)
      toast.error(error.message)
    }
  }
  const fetchDocInfo=async()=>{
    const docInfo=doctors.find(doc=>doc._id===docId)
    setDocInfo(docInfo)
    
  }

  const getAvailableSlots=async()=>{
    if(!docInfo) return null
    
    let today=new Date();
    const allSlots=[];
    for(let i=0;i<7;i++)
    {
      let currentDate=new Date(today)
      currentDate.setDate(today.getDate()+i)
      let endTime=new Date();
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)
      if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10? currentDate.getHours()+1:10)
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)

      }
      else
      {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots=[]
      while(currentDate<endTime){
        let fromattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        let day=currentDate.getDate()
        let month=currentDate.getMonth()+1
        let year =currentDate.getFullYear()
        const slotDate=day+"_"+month+"_"+year
        const slotTime=fromattedTime
        const isSlotAvailable=docInfo.slots_booked[slotDate]&& docInfo.slots_booked[slotDate].includes(slotTime)?false:true

        if(isSlotAvailable){
           timeSlots.push({
          datetime:new Date(currentDate),
            time:fromattedTime
        })
        }
        currentDate.setMinutes(currentDate.getMinutes()+30)
        
       
       }
       allSlots.push(timeSlots);
        



    }
    setDocSlots(allSlots)


  }
  useEffect(()=>{
    fetchDocInfo();   
  },[doctors,docId])

  useEffect(()=>{
    getAvailableSlots()
  },[docInfo])

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])
  return docInfo&&(
    <div>
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image}></img>
        </div>
        <div className='flex-1 border border-gray-400 rounded px-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <div className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            <h1>{docInfo.name}</h1>
          <img className='w-5' src={assets.verified_icon}></img>
          </div>
         <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
           <p>{docInfo.degree+"-"+ docInfo.speciality}</p>
          <p className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</p>
         </div>
         <div className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
          <h3>About </h3>
          <img className='w-3' src={assets.info_icon}></img>
           </div>
         <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        
        <div className='flex gap-1 text-md text-gray-700 mt-4'>
           <p>Appointment fee:</p>
         <p>{currencySymbol}{docInfo.fees}</p>
        </div>


          
        </div>

      </div>
      {/*Booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length&& docSlots.map((item,index)=>{
             return (
               <div onClick={()=>{setSlotIndex(index)}} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index? 'bg-primary text-white' :"border border-gray-300"}`} key={index}>
                <p>{item[0]&& daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0]&& item[0].datetime.getDate()}</p>
              </div>
             )
            })
          }
        </div>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length&& docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>{setslotTime(item.time)}} key={index} className={`text-sm font-light flex-shrink-0 py-2 px-5 rounded-full cursor-pointer ${item.time===slotTime? 'bg-primary text-white':'text-gray-400 border border-gray-300'}`}>
                {item.time.toLowerCase()}
              </p>
            )
            )
            
          }
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment </button>

      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment