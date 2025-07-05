import { useEffect, useState } from "react";

export default function Fees(){

    const[student,setStudent]=useState(null);
    const[message,setMessage]=useState('');
    const[requestSent,setRequestSent]=useState(false);

    useEffect(()=>{
        const fetchStudent=async()=>{
            const stored=JSON.parse(localStorage.getItem("student"));
            if(!stored || !stored.firebaseUid){
                return;
            }

            try{
                const res=await fetch(`http://localhost:8080/api/students/firebase/${stored.firebaseUid}`);
                const data=await res.json();
                setStudent(data);
            }
            catch(err){
                console.error("Failed to fetch student data",err);
            }
        };
        fetchStudent();
    },[]);

    const handleRequest=async(e)=>{
        e.preventDefault();

        try{
            const res=await fetch(`http://localhost:8080/api/fees-requests/student/${student.id}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    requestedStatus:message,
                    status:"Pending"
                })
            });
            
            if(!res.ok){
                const errorText=await res.text();
                throw new Error("Failed to send request:", errorText);
            }
            setRequestSent(true);
        }
        catch(err){
            console.error(err);
            alert("Error: "+err.message);
        }
    };

    if(!student){
        return(
            <div>Loading...</div>
        );
    };


    return (
    <div className="flex justify-center items-start mt-25 min-h-screen">
        <div className="flex flex-col gap-5 w-full max-w-xl px-10">
        <h2 className="font-bold text-center text-2xl">Fees Details</h2>

        <p className="text-lg">
            <strong>Status:</strong> {student.feesStatus}
        </p>

        {student.feesStatus === "Paid" ? (
            <p className="text-green-600 text-lg">
            Your fee status is already updated.
            </p>
        ) : requestSent ? (
            <p className="text-blue-600 text-lg">
            Fee update request sent successfully.
            </p>
        ) : (
            <form onSubmit={handleRequest} className="flex flex-col gap-4">
            <textarea
                placeholder="Write your request message..."
                rows="4"
                className="border p-2 rounded"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-fit">
                Send Update Request
            </button>
            </form>
        )}
        </div>
    </div>
    );

};