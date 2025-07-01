import React, { useState } from 'react';
import { login } from '../../utils/firebaseAuth';
import { useNavigate } from 'react-router-dom';

export default function LoginStudent(){
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

      const response=await fetch(`http://localhost:8080/api/students/firebase/${firebaseUid}`);
      if(!response.ok){
        throw new Error("Student record not found")
      };

      const studentData=await response.json();
      console.log("Firebase UID:",firebaseUid);
      console.log("Student Data:",studentData);

      localStorage.setItem("student",JSON.stringify(studentData));
      navigate('/student/dashboard/profile');
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
    <form onSubmit={handleLogin} className="flex flex-col items-center mt-20 p-4 bg-white rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login as Student</h2>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded mb-3 w-full" required />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="border p-2 rounded mb-4 w-full" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
