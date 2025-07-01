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
    },[])

    if(!student){
        return(
            <div>Loading...</div>
        );
    }


    return(
        <div className="pl-5">
            <h2 className="mt-10 font-bold text-xl">Student Profile</h2>
            
            <table className="mt-10 border border-none border-separate border-spacing-y-4 border-spacing-x-4">
                <tr>
                    <td><strong>Name :</strong></td><td>{student.name}</td>
                </tr>
                <tr className="">
                    <td><strong>Email :</strong></td><td>{student.email}</td>
                </tr>
                <tr>
                    <td><strong>College Name :</strong></td><td>{student.collegeName}</td>
                </tr>
                <tr>
                    <td><strong>Room No :</strong></td><td>{student.room ? student.room.roomNumber : "Not assigned"}</td>
                </tr>
                <tr>
                    <td><strong>Contact No :</strong></td><td>{student.contactNumber}</td>
                </tr>
                <tr>
                    <td><strong>Warden Name :</strong></td><td>{student.warden ? student.warden.name : "Not assigned"}</td>
                </tr>
                <tr>
                    <td><strong>Warden Contact No :</strong></td><td>{student.warden ? student.warden.contactNumber : "Not assigned"}</td>
                </tr>
            </table>
        </div>
    );
};