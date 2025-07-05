import { useEffect, useState } from "react"

export default function Profile(){

    const[student,setStudent]=useState(null);

    useEffect(()=>{
        const fetchStudent=async()=>{
            const stored=JSON.parse(localStorage.getItem('student'));
            if(!stored){
                return;
            };

            try{
                const res=await fetch(`http://localhost:8080/api/students/firebase/${stored.firebaseUid}`);
                const data=await res.json();
                setStudent(data);
            }
            catch(err){
                console.error("Error fetching student:", err);
            }
        };
        fetchStudent();
    },[]);

    if(!student){
        return(
            <div>Loading...</div>
        );
    }


    return (
    <div className="min-h-screen flex justify-center items-start pt-10">
        <div className="bg-white p-7 rounded shadow-2xl mt-15 w-full max-w-2xl">
        <h2 className="font-bold text-2xl text-center mb-10 border-b-2 border-gray-200 pb-5">Student Profile</h2>

        <table className="w-full table-fixed border-separate border-spacing-y-4 border-spacing-x-6">
            <tbody>
            <tr>
                <td className="font-semibold w-1/3">Name:</td>
                <td>{student.name}</td>
            </tr>
            <tr>
                <td className="font-semibold">Email:</td>
                <td>{student.email}</td>
            </tr>
            <tr>
                <td className="font-semibold">College Name:</td>
                <td>{student.collegeName}</td>
            </tr>
            <tr>
                <td className="font-semibold">Room No:</td>
                <td>{student.room ? student.room.roomNumber : "Not assigned"}</td>
            </tr>
            <tr>
                <td className="font-semibold">Contact No:</td>
                <td>{student.contactNumber}</td>
            </tr>
            <tr>
                <td className="font-semibold">Warden Name:</td>
                <td>{student.warden ? student.warden.name : "Not assigned"}</td>
            </tr>
            <tr>
                <td className="font-semibold">Warden Contact No:</td>
                <td>{student.warden ? student.warden.contactNumber : "Not assigned"}</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
    );

};