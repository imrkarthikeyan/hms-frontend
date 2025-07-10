import { useEffect, useState } from "react";

export default function ManageVisitors(){
    
    const[requests,setRequests]=useState([]);
    const[error,setError]=useState('');

    useEffect(()=>{
        const fetchRequests=async()=>{
            try{
                const res=await fetch("https://hms-backend-aqwe.onrender.com/api/parent-visits");
                if(!res.ok){
                    throw new Error('Failed to fetch visit requests');
                }
                const data=await res.json();
                setRequests(data);
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        };
        fetchRequests();
    },[]);


    const handleStatusChange=async(id,newStatus)=>{
        try{
            const request=requests.find(r=>r.id===id);
            const updated={...request, status: newStatus};

            const res=await fetch(`https://hms-backend-aqwe.onrender.com/api/parent-visits/${id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updated)
            });

            if(!res.ok){
                throw new Error('Status update failed');
            };

            setRequests(prev=>prev.map(req=>req.id===id ? {...req, status: newStatus} : req));
            alert("Failed to update status");
        }
        catch(err){
            console.error(err);
            alert("Error updating status: " + err.message);
        }
    };

    if(error){
        return(
            <div className="text-red-600">{error}</div>
        );
    }


    return(
        <div className="p-6 mt-8 w-full">
            <h2 className="font-bold text-2xl py-6">Manage Visitor Requests</h2>

            {requests.length===0 ? (
                <p>No visitor requests found.</p>
            ) : (
                <table className="w-full table-auto border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">Student</th>
                            <th className="border px-3 py-2">Visitor Name</th>
                            <th className="border px-3 py-2">Date</th>
                            <th className="border px-3 py-2">Reason</th>
                            <th className="border px-3 py-2">Status</th>
                            <th className="border px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req)=>(
                            <tr key={req.id} className="text-center">
                                <td className="border px-3 py-2">{req.student?.name || "N/A"}</td>
                                <td className="border px-3 py-2">{req.visitorName || "N/A"}</td>
                                <td className="border px-3 py-2">{req.requestDate || "N/A"}</td>
                                <td className="border px-3 py-2">{req.reason || "N/A"}</td>
                                <td className="border px-3 py-2">{req.status || "N/A"}</td>
                                <td className="border px-3 py-2 space-x-2">
                                    <button onClick={()=>handleStatusChange(req.id,"Approved")} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Approve</button>
                                    <button onClick={()=>handleStatusChange(req.id,"Rejected")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    )
}