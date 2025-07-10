import { useEffect, useState } from "react";

export default function UpdateFees(){

    const[students,setStudents]=useState([]);
    const[updatedFees,setUpdatedFees]=useState({});
    const[message,setMessage]=useState("");

    const fetchStudents=async()=>{
        try{
            const res=await fetch("https://hms-backend-aqwe.onrender.com/api/students");
            const data=await res.json();
            setStudents(data);
        }
        catch(err){
            console.error("Error fetching students:", err);
            setMessage("Failed to fetch students");
        }
    };

    useEffect(()=>{
        fetchStudents();
    },[]);

    const handleStatusChange=(studentId,newStatus)=>{
        setUpdatedFees((prev)=>({
            ...prev, [studentId]:newStatus,
        }));
    };

    const handleUpdate=async(studentId)=>{
        const student=students.find((s)=>s.id===studentId);
        const newStatus=updatedFees[studentId];

        if(!newStatus  || newStatus===student.feesStatus){
            setMessage("Please select a status for the student");
            return;
        }

        const updatedStudent={...student, feesStatus:newStatus};

        try{
            const res=await fetch(`https://hms-backend-aqwe.onrender.com/api/students/${studentId}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(updatedStudent)
            });

            if(!res.ok){
                throw new Error("Failed to update student fees status");
            }

            setMessage("Fees status updated successfully");
            setStudents((prev)=>
            prev.map((s)=>(s.id===studentId ? {...s,feesStatus:newStatus}:s))
            );
        }
        catch(err){
            console.error("Error updating fees status:", err);
            setMessage("Error updating fees status: " + err.message);
        }
    };


    return(
        <div className="p-6">
            <h2 className="font-bold text-2xl mb-4 mt-10">Update Fees Status</h2>
            {message && <p className="text-green-500">{message}</p>}

            <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2 text-left">Current Status</th>
                        <th className="border px-4 py-2 text-left">New Status</th>
                        <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student)=>(
                        <tr key={student.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{student.name}</td>
                            <td className="border px-4 py-2">{student.email}</td>
                            <td className="border px-4 py-2">{student.feesStatus}</td>
                            <td className="border px-4 py-2">
                                <select value={updatedFees[student.id] || student.feesStatus} onChange={(e)=>handleStatusChange(student.id,e.target.value)} className="border p-1 rounded">
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={()=>handleUpdate(student.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}