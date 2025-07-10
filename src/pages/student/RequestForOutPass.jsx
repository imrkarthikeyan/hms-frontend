import { useEffect, useState } from "react";

export default function RequestForOutPass(){
    const[startFrom,setStartFrom]=useState('');
    const[endTo,setEndTo]=useState('');
    const[reason,setReason]=useState('');
    const[message,setMessage]=useState('');
    const[canRequest,setCanRequest]=useState(true);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const student=JSON.parse(localStorage.getItem('student'));
        if(!student || !student.id){
            setMessage("Student not found. Please log in again.");
            setCanRequest(false);
            return;
        }

        const outPassData={
            startFrom,
            endTo,
            reason
        };

        try{
            const res=await fetch(`https://hms-backend-aqwe.onrender.com/api/outpass/student/${student.id}`, {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(outPassData)
            });
            if(!res.ok){
                const errText=await res.text();
                throw new Error("Failed to request out pass: " + errText);
            };

            setMessage("Out pass requested successfully!");
            setStartFrom('');
            setEndTo('');
            setReason('');
            setCanRequest(false)
        }
        catch(err){
            console.error(err);
            setMessage("Error: "+ err.message);
        }
    };

    useEffect(()=>{
        const student=JSON.parse(localStorage.getItem('student'));
        if(!student || !student.id){
            setMessage("Student not found. Please log in again.");
            setCanRequest(false);
            return;
        }
        const checkOutPassEligibility=async()=>{
            try{
                const res=await fetch(`https://hms-backend-aqwe.onrender.com/api/outpass/student/${student.id}/latest`);
                if(!res.ok){
                    throw new Error("Failed to check out pass eligibility");
                }
                const data=await res.json();
                if(data && data.status === "APPROVED"){
                    const today=new Date().toISOString().split('T')[0];
                    if(today<= data.endTo){
                        setCanRequest(false);
                        setMessage("You already have an approved out pass until " + data.endTo + ". You cannot request a new one.");
                    }
                }
            }
            catch(err){
                console.error("Failed to fetch latest out pass:", err);
            }
        }
        checkOutPassEligibility();
    },[]);


    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 w-full max-w-md flex flex-col text-center">
                <h2 className="font-bold text-2xl pl-10">Request for Out Pass</h2>
                {message && <div className="text-green-600 mt-2 pl-4">{message}</div>}
                {canRequest && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md p-6">
                    <label className="text-left">
                        Start Date:
                        <input 
                            type="date" 
                            value={startFrom} 
                            onChange={(e)=>setStartFrom(e.target.value)} 
                            required 
                            className="border p-2 rounded w-full mt-4"
                        />
                    </label>
                    <label className="text-left mt-5">
                        End Date:
                        <input 
                            type="date" 
                            value={endTo} 
                            onChange={(e)=>setEndTo(e.target.value)} 
                            required 
                            className="border p-2 rounded w-full mt-4"
                        />
                    </label>
                    <label className="text-left mt-5">
                        Reason:
                        <textarea 
                            value={reason} 
                            onChange={(e)=>setReason(e.target.value)} 
                            required 
                            className="border p-2 rounded w-full mt-4"
                        />
                    </label>
                    <div>
                        <button 
                            type="submit" 
                            onClick={handleSubmit} 
                            className="bg-blue-500 text-white p-2 rounded mt-4"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
                )}
            </div>
        </div>
    )
}