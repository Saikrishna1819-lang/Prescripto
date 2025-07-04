import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state,setState]=useState("Admin")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {setAToken,backendUrl}=useContext(AdminContext)
    const onSubmitHandler=async(event)=>{
        event.preventDefault()
        if(state==="Admin")
        {
            const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password})
            if(data.success)
            {
                localStorage.setItem('aToken',data.token)
                setAToken(data.token);
                
            }
            else
            {
                console.log(data.message)
                toast.error(data.message)
            }
        }
       
    }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl m-auto font-semibold'><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <p className='mb-1'>Email</p>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='px-4 py-2 border border-gray-400 w-full rounded' type="email" required></input>
            </div>
            <div className='w-full'>
                <p className='mb-1'>Password</p>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='px-4 py-2 border border-gray-400 w-full rounded' type="password" required></input>
            </div>
            <button className='w-full bg-primary px-4 py-1.5 text-white font-mediam text-lg rounded'>Login</button>
            <p>{state==="Admin"?"Doctor Login":"Admin Login"} <span onClick={()=>{setState(state==="Admin"?"Doctor":"Admin")}} className='text-primary cursor-pointer underline'>Click here</span></p>

        </div>
    </form>
  )
}

export default Login