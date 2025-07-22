import React, { useState } from 'react';
import { login } from '../../utils/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import ksr from '../../assets/ksr.jpeg';

export default function LoginWarden(){
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const userCred=await login(email,password);
      const firebaseUid=userCred.user.uid;

      const response=await fetch(`https://hms-backend-aqwe.onrender.com/api/wardens/firebase/${firebaseUid}`);
      if(!response.ok){
         throw new Error("Warden not found")
      };

      const wardenData=await response.json();

      localStorage.setItem("warden",JSON.stringify(wardenData));

      navigate('/warden/dashboard/profile');

    }
    catch(error){
      console.error("Login failed:",error.message);
      alert("Login failed: " +error.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-800 top-0 w-full fixed text-white p-4 flex items-center border-b border-gray-500 z-10 h-[65px]">
        <div className="w-full flex justify-between items-center px-2 sm:px-5">
          <div className="text-yellow-300 font-bold flex gap-3 items-center sm:gap-6">
            <img src={ksr} alt="hms" className="h-10 w-10 rounded-xl" />
            <div className='text-sm sm:text-base'>
              <h2>K. S. Rangasamy College of Technology</h2>
              <h3>Hostel Management System</h3>
            </div>
          </div>
          <div className="text-sm sm:text-base">
            <h2>Home</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-center pt-28 px-4'>
        <form onSubmit={handleLogin} className="flex flex-col items-center w-full max-w-sm bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Login as Warden</h2>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded mb-3 w-full" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border p-2 rounded mb-3 w-full" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 cursor-pointer" disabled={loading}>{loading ? 'Loggin in...' : 'Login'}</button>
        </form>
      </div>
      <p className='text-center text-sm text-gray-600 mt-auto mb-5 px-2'>© created by <span className='text-blue-700 font-medium'>rkarthikeyan</span></p>
    </div>
  );
};