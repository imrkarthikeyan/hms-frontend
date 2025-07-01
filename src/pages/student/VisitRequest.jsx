import { useState } from "react";

export default function VisitRequest(){

    const[parentName,setParentName]=useState('');
    const[parentContact,setParentContact]=useState('');
    const[visitDate,setVisitDate]=useState('');
    const[message,setMessage]=useState('');
    const[reason,setReason]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const student=JSON.parse(localStorage.getItem('student'));
        if(!student || !student.id){
            setMessage("Student not found. Please log in agaon");
            return;
        }

        const requestData={
            requestDate:visitDate,
            ststus:"Pending",
            visitorName:parentName,
            reason:reason
        };

        try{
            const res=await fetch(`http://localhost:8080/api/parent-visits/student/${student.id}`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(requestData)
            });

            if(!res.ok){
                throw new Error('Failed to submit Request');
            };

            setMessage('parent visit request submitted successfully!');
            setParentName('');
            setParentContact('');
            setVisitDate('');
            setReason('');
        }
        catch(err){
            console.error(err);
            setMessage("Error: ",err.message);
        }
    };


    return(
        <div className=" p-6 min-h-screen flex justify-center items-center flex-col">
            <div className="p-6 w-full max-w-md flex flex-col text-center">
                <h2 className="font-bold text-center text-2xl">Request to Parent Visit</h2>
                {message && <div className="mt-4 text-blue-600">{message}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-7 max-w-md mt-10">
                    <input type="text" placeholder="Parent Name" value={parentName} onChange={(e)=>{setParentName(e.target.value)}} className="border p-2 rounded" required/>
                    <input type="tel" placeholder="Parent Contact" value={parentContact} onChange={(e)=>setParentContact(e.target.value)} className="border p-2 rounded" required />
                    <textarea placeholder="Reason for Visit" value={reason} onChange={(e)=>setReason(e.target.value)} className="border p-2 rounded" required />
                    <input type="date" value={visitDate} onChange={(e)=>setVisitDate(e.target.value)} className="border p-2 rounded" required />
                    <div>
                        <button type="submit" className="bg-green-600 px-5 py-2 mt-2 rounded w-35 text-white">Send Request</button>
                    </div>
                </form>
            </div>
        </div>
    )
}