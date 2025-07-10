import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import ksr from '../../assets/ksr.jpeg';

export default function SignupStudent(){

    const navigate=useNavigate();

    const[form,setForm]=useState({
        name:'',
        email:'',
        password:'',
        contactNumber:'',
        collegeName:'',
        roomNumber:''
    });

    const[loading,setLoading]=useState(false);

    const handleChange=(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);

        try{
            const userCred=await createUserWithEmailAndPassword(auth,form.email, form.password);
            const firebaseUid=userCred.user.uid;
            const studentData={
                name:form.name,
                email:form.email,
                contactNumber:form.contactNumber,
                collegeName:form.collegeName,
                roomNumber:form.roomNumber,
                firebaseUid:firebaseUid
            };

            const res=await fetch('https://hms-backend-aqwe.onrender.com/api/students',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(studentData)
            });

            if(!res.ok){
                throw new Error("Failed to save student in backend");
            }

            const savedStudent=await res.json();
            
            localStorage.setItem('student', JSON.stringify(savedStudent));

            navigate('/student/dashboard/profile')
        }
        catch(err){
            console.error("Signup error:", err.message);
            alert("Signup failed: " + err.message);
        }
        finally{
            setLoading(false);
        }
    }


    return (
    <div className="flex flex-col min-h-screen">
        <div className="bg-gray-800 t-0 w-full fixed text-white p-4 flex items-center border-b border-gray-500 z-10 pl-5 h-[65px]">
            <div className="w-full flex justify-between items-center">
                <div className="text-yellow-300 font-bold flex gap-6 items-center">
                <img src={ksr} alt="hms" className="h-10 w-10 rounded-xl" />
                <div>
                    <h2>K. S. Rangasamy College of Technology</h2>
                    <h3>Hostel Management System</h3>
                </div>
                </div>
                <div className="mr-5">
                <h2>Home</h2>
                </div>
            </div>
        </div>
        <div className="flex flex-1 items-center justify-center mt-[65px]">
        <form onSubmit={handleSubmit} className="p-6 w-full max-w-md mt-10 border border-none shadow-xl flex flex-col gap-6 rounded shadow">
            <h2 className="text-center text-3xl font-bold">Student Register</h2>
            <input type="text" placeholder="Full Name" name="name" value={form.name} onChange={handleChange} className="border p-2 pl-3 rounded" required />
            <input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} className="border p-2 pl-3 rounded" required />
            <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} className="border p-2 pl-3 rounded" required/>
            <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} className="border p-2 pl-3 rounded" required />
            <input name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} className="border p-2 pl-3 rounded" required/>
            <input name="roomNumber" placeholder="Room Number" value={form.roomNumber} onChange={handleChange} className="border p-2 pl-3 rounded" required/>
            <div className="text-center">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </div>
        </form>
        </div>
        <p className="text-center mt-auto mb-7">© created by <span className="text-blue-700">rkarthikeyan</span></p>
    </div>
    );

}