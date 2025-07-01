import { useState } from "react"
import { useNavigate } from "react-router-dom";

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
            const userCred=await SignupStudent(form.email, form.password);
            const firebaseUid=userCred.user.uid;
            const studentData={
                name:form.name,
                email:form.email,
                contactNumber:form.contactNumber,
                collegeName:form.collegeName,
                roomNumber:form.roomNumber,
                firebaseUid:firebaseUid
            };

            const res=await fetch('http://localhost:8080/api/students',{
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


    return(
        <div>
            <h2 className="text-center mt-20 text-3xl font-bold">Student Register</h2>
            <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto mt-10 bg-gray-300 flex flex-col gap-6 rounded shadow">
                <input type="text" placeholder="Full Name" name="name" value={form.name} onChange={handleChange} className="input border p-1 pl-3 rounded" required/>
                <input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} className="input border p-1 pl-3 rounded" required/>
                <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} className="input border p-1 pl-3 rounded" required/>
                <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} className="input border p-1 pl-3 rounded" required/>
                <input name="collegeName"  placeholder="College Name" value={form.collegeName} onChange={handleChange} className="input border p-1 pl-3 rounded" required/>
                <input name="roomNumber" value={form.roomNumber} onChange={handleChange} placeholder="Room Number" className="input border p-1 pl-3 rounded" required/>
                <div className="text-center">
                    <button type="submit" className="bg-[Green] w-25 p-2 text-white rounded" disabled>{loading?'Signing Up...':'Sign Up'}</button>
                </div>
            </form>
        </div>
    )
}