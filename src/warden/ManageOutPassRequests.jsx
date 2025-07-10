import { useEffect, useState } from "react";

export default function ManageOutPassRequests(){

    const[outPassRequests, setOutPassRequests] = useState([]);
    const[filter, setFilter] = useState("ALL");
    const[error, setError] = useState("");
    const[message, setMessage] = useState("");

    useEffect(()=>{
        const fetchOutPassRequests=async()=>{
            let url="https://hms-backend-aqwe.onrender.com/api/outpass";
            if(filter!=="ALL"){
                url=`https://hms-backend-aqwe.onrender.com/api/outpass/status/${filter}`;
            }
            try{
                const res=await fetch(url);
                if(!res.ok){
                    throw new Error('Failed to fetch out pass requests');
                }
                const data=await res.json();
                setOutPassRequests(data);
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        };
        fetchOutPassRequests();
    },[filter]);

    const handleStatusChange=async(id,newStatus)=>{
        const outpass=outPassRequests.find(o=>o.id===id);
        const updated={...outpass, status:newStatus};

        try{
            const res=await fetch(`https://hms-backend-aqwe.onrender.com/api/outpass/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(updated)
            });

            if(!res.ok){
                throw new Error('Status update failed');
            }
            setMessage("Out pass request status updated successfully");
            setError("");
            setTimeout(()=>setMessage(""),3000);

            const refetchUrl=filter==="ALL" ? "https://hms-backend-aqwe.onrender.com/api/outpass" : `https://hms-backend-aqwe.onrender.com/api/outpass/status/${filter}`;
            const data=await(await fetch(refetchUrl)).json();
            setOutPassRequests(data);
        }
        catch(err){
            console.error(err);
            setError("Error updating status: " + err.message);
        }
    };


    return(
        <div className="p-6 w-full mt-10 rounded">
            <h2 className="font-bold text-2xl py-6">Manage Out Pass Requests</h2>

            {message && <div className="text-green-500 mb-4">{message}</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-6">
                <label className="font-semibold mr-2">Filter by Status :</label>
                <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="py-1 px-3 border rounded">
                    <option value="ALL">All</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                </select>
            </div>

            {outPassRequests.length===0 ? (<p>No Out PAss Requests found</p>) : (
                <table className="w-full table-auto border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">Student Name</th>
                            <th className="border px-4 py-2">Start From</th>
                            <th className="border px-4 py-2">Until</th>
                            <th className="border px-4 py-2">Reason</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outPassRequests.map((request)=>(
                            <tr key={request.id}>
                                <td className="border px-4 py-2">{request.student?.name || "N/A"}</td>
                                <td className="border px-4 py-2">{request.startFrom}</td>
                                <td className="border px-4 py-2">{request.endTo}</td>
                                <td className="border px-4 py-2">{request.reason}</td>
                                <td className="border px-4 py-2">{request.status}</td>
                                <td className="border px-4 py-2">{request.status!=="APPROVED" && (
                                    <button onClick={()=>handleStatusChange(request.id,"APPROVED")} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                        Approve
                                    </button>
                                )}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}