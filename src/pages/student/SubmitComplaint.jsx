import { useState } from "react";

export default function SubmitComplaint(){

    const[type,setType]=useState('');
    const[description,setDescription]=useState('');
    const[message,setMessage]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const student=JSON.parse(localStorage.getItem('student'));
        if(!student || !student.id){
            setMessage("Student not found. Please log in again.");
            return;
        }

        const complaintData={
            type,
            description
        };

        try{
            const res=await fetch(`http://localhost:8080/api/complaints/student/${student.id}`, {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(complaintData)
            });
            if(!res.ok){
                const errText=await res.text();
                throw new Error("Failed to submit complaint: ",errText);
            };

            setMessage("Complaint submitted successfully!");
            setType('');
            setDescription('');
        }
        catch(err){
            console.error(err);
            setMessage("Error: ",err.message);
        }
    };


    return(
        <div className="shadow p-6 rounded w-full">
            <h2 className="mt-10 font-bold text-xl pl-10">Submit Complaint</h2>
            {message && <div>{message}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md pl-10 mt-10">
                <label>
                    Complaint Type :
                    <select value={type} onChange={(e)=>setType(e.target.value)} required className="border p-2 rounded w-full mt-3">
                        <option value="">Select type</option>
                        <option value="Maintanance">Maintanance</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Water">Water</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label className="mt-5">
                    Description :
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows="5" placeholder="Describe the issue" required className="border p-2 rounded w-full mt-3"/>
                </label>
                <button type="submit" className="bg-green-500 pl-2 pr-2 py-1 mt-3 rounded text-white w-30">Submit</button>
            </form>
        </div>
    )
}