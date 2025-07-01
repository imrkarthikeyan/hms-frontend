import { useEffect, useState } from "react";

export default function ViewComplaints(){
    const[complaints,setComplaints]=useState([]);
    const[error,setError]=useState('');

    useEffect(()=>{
        const fetchComplaints=async()=>{
            const student=JSON.parse(localStorage.getItem('student'));
            if(!student || !student.id){
                setError("Student not found. Please log in again");
                return;
            }

            try{
                const res=await fetch(`http://localhost:8080/api/complaints/student/${student.id}`);
                if(!res.ok){
                    throw new Error('Failed to fetch complaints');
                };
                const data=await res.json();
                setComplaints(data);
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        };
        fetchComplaints();
    },[]);

    if(error){
        return(
            <div className="text-red-600">{error}</div>
        )
    }


    return(
        <div className="p-6 w-full">
            <h2 className="mt-10 font-bold text-xl py-10">Your past Complaints</h2>
            {complaints.length===0 ? (
                <p>No complaints submitted yet.</p>
            ) : (
                <table className="w-full table-auto border">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((comp) => (
                        <tr key={comp.id}>
                            <td className="border px-4 py-2">{comp.type}</td>
                            <td className="border px-4 py-2">{comp.description}</td>
                            <td className="border px-4 py-2">{comp.status}</td>
                            <td className="border px-4 py-2">{new Date(comp.createdAt).toLocaleString()}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    )
}