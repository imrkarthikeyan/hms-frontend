import { useEffect } from "react";
import { useState } from "react";

export default function ManageComplaints(){

    const[complaints,setComplaints]=useState([]);
    const[filter,setFilter]=useState("ALL");
    const[error,setError]=useState("");
    const[message,setMessage]=useState("");

    useEffect(()=>{
        const fetchComplaints=async()=>{
            let url="http://localhost:8080/api/complaints";
            if(filter!=="ALL"){
                url=`http://localhost:8080/api/complaints/status/${filter}`;
            }

            try{
                const res=await fetch(url);
                if(!res.ok){
                    throw new Error('Failed to fetch complaints');
                }
                const data=await res.json();
                setComplaints(data);
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        };
        fetchComplaints();
    },[filter]);

    const handleStatusChange=async(id,newStatus)=>{
        const complaint=complaints.find(c=>c.id===id);
        const updated={...complaint, status: newStatus};

        try{
            const res=await fetch(`http://localhost:8080/api/complaints/${id}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(updated)
            });

            if(!res.ok){
                throw new Error('Status update failed');
            };

            setMessage("Complaint status updated successfully");
            setError("");
            setTimeout(()=>setMessage(""),3000);

            const refetchUrl=filter==="ALL" ? "http://localhost:8080/api/complaints" : `http://localhost:8080/api/complaints/status/${filter}`;

            const data=await(await fetch(refetchUrl)).json();
            setComplaints(data);
        }
        catch(err){
            console.error(err);
            setError("Error updating status: " + err.message);
        }
    };


    return(
        <div className="p-6 w-full rounded">
            <h2 className="font-bold text-2xl py-6">Manage Complaints</h2>

            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="mb-6">
                <label className="font-semibold mr-2">Filter by status :</label>
                <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="px-3 py-1 border rounded">
                    <option value="ALL">ALL</option>
                    <option value="PENDING">PENDING</option>
                    <option value="RESOLVED">RESOLVED</option>
                </select>
            </div>

            {complaints.length===0 ? (<p>No Complaints found</p>) : (
                <table className="w-full table-auto border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">Student Name</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((comp)=>(
                            <tr key={comp.id}>
                                <td className="border px-4 py-2">{comp.student?.name || "N/A"}</td>
                                <td className="border px-4 py-2">{comp.type}</td>
                                <td className="border px-4 py-2">{comp.description}</td>
                                <td className="border px-4 py-2">{comp.status}</td>
                                <td className="border px-4 py-2">{new Date(comp.createdAt).toLocaleString()}</td>
                                <td  className="border px-4 py-2">{comp.status!=="RESOLVED" && (
                                    <button onClick={()=>handleStatusChange(comp.id, "RESOLVED")} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Mark RESOLVED</button>
                                )}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}