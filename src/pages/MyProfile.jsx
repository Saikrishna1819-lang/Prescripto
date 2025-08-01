import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyProfile = () => {

  const [isEdit, setIsEdit] = useState(false)
  const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)
  const [image,setImage]=useState(false)
  const updateUserProfileData=async()=>{
    try{
      const fromData=new FormData()
      fromData.append('name',userData.name)
      fromData.append('phone',userData.phone)
      fromData.append('address',JSON.stringify(userData.address))
      fromData.append('gender',userData.gender)
      fromData.append('dob',userData.dob)
      image && fromData.append('image',image)
      const {data}=await axios.post(backendUrl+'/api/user/update-profile',fromData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else
      {
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
      
    
  }

  }


  return userData&&(
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit
        ? <label htmlFor='image'>
        <div className='inline-block relative cursor-pointer'>
          <img className='w-36 rounded-full opacity-75' src={image?URL.createObjectURL(image):userData.image} alt=""></img>
          <img className='w-10  absolute bottom-12 right-12' src={image?"":assets.upload_icon} alt=""></img>
          

        </div>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden></input>
        </label>
        :<img className='w-36 rounded' src={userData.image}></img>
      }
     
      {
        isEdit
          ? <input className='bg-gray-100 px-2 py-1 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(e) => { setUserData(prev => ({ ...prev, name: e.target.value })) }}></input>
          : <p className='font-medium text-3xl text-neutral-800  mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div >
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 px-2 py-2 max-w-52' type="text" value={userData.phone} onChange={(e) => { setUserData(prev => ({ ...prev, phone: e.target.value })) }}></input>
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-100 mb-2 px-2 py-1' type="text" onChange={(e) => { setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } })) }} value={userData.address.line1} ></input>
                <br />
                <input className='bg-gray-100 px-2 py-1' type="text" onChange={(e) => { setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } })) }} value={userData.address.line2} />
              </p>
              : <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>

      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100 px-2 py-1' onChange={(e) => { setUserData(prev => ({ ...prev, gender: e.target.value })) }} value={userData.gender} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit
            ? <input className='max-w-28 px-2 py-1 bg-gray-100 ' type="date" onChange={(e)=> setUserData(prev=> ({...prev,dob:e.target.value}))}></input>
            : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
          ? <button  className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 ' onClick={updateUserProfileData}>Save Information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={()=>{setIsEdit(true)}}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile