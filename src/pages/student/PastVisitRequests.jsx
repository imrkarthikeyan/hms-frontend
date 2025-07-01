import { useEffect, useState } from "react";

export default function PastVisitRequests(){

    const[requests, setRequests]=useState([]);
    const[error,setError]=useState('');

    useEffect(()=>{
        const fetchRequests=async()=>{
            const student=JSON.parse(localStorage.getItem("student"));
            if(!student || !student.id){
                setError("Student not found. Please log in again");
                return;
            }

            try{
                const res=await fetch(`http://localhost:8080/api/parent-visits/student/${student.id}`);
                if(!res.ok){
                    throw new Error('Failed to fetch past requests');
                };
                const data=await res.json();
                setRequests(data);
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        };
        fetchRequests();
    },[])

    if(error){
        return(
            <div className="text-red-600">{error}</div>
        )
    }


    return(
        <div className="p-6 w-full">
            <h2 className="mt-10 font-bold text-2xl py-10">Your past Requests</h2>
            {requests.length===0 ? (
                <p>No requests submitted yet.</p>
            ) : (
                <table className="w-full table-auto border">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="border px-4 py-2">Visitor</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Reason</th>
                        <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req)=>(
                        <tr key={req.id}>
                            <td className="border px-4 py-2">{req.visitorName}</td>
                            <td className="border px-4 py-2">{req.requestDate}</td>
                            <td className="border px-4 py-2">{req.reason}</td>
                            <td className={`border border-gray-700 px-3 py-2 ${req.status==='Approved' ? 'text-green-600' : req.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                {req.status}
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