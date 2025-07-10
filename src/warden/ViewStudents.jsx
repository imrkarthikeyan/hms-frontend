import { useEffect, useState } from "react";

export default function ViewStudents(){

    const[students,setStudents]=useState([]);
    const[error,setError]=useState('');

    useEffect(()=>{
        const fetchStudents=async()=>{
            const warden=JSON.parse(localStorage.getItem("warden"));
            if(!warden || !warden.id){
                setError("Warden not found. Please log in again");
                return;
            }

            try{
                const res=await fetch("https://hms-backend-aqwe.onrender.com/api/students");
                if(!res.ok){
                    throw new Error('Failed to fetch students');
                };
                const data=await res.json();
                setStudents(data);
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        };
        fetchStudents();
    },[]);

    if(error){
        return(
            <div className="text-red-600">{error}</div>
        )
    }


    return(
        <div className="p-6 w-full">
            <h2 className="font-bold text-2xl py-10">All Students</h2>
            {students.length===0 ? (
                <p>No students found.</p>
            ) : (
                <table className="w-full table-auto border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Contat</th>
                            <th className="border px-4 py-2">College</th>
                            <th className="border px-4 py-2">Room No</th>
                            <th className="border px-4 py-2">Fee Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((std)=>(
                        <tr key={std.id}>
                            <td className="border px-4 py-2">{std.name}</td>
                            <td className="border px-4 py-2">{std.email}</td>
                            <td className="border px-4 py-2">{std.contactNumber}</td>
                            <td className="border px-4 py-2">{std.collegeName}</td>
                            <td className="border px-4 py-2">
                                {std.room ? std.room.roomNumber : "Not Assigned"}
                            </td>
                            <td className="border px-3 py-2">{std.feesStatus}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    )
}