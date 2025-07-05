import { useEffect, useState } from "react";

export default function RoomDetails(){

    const[room,setRoom]=useState(null);
    const[error,setError]=useState("");

    useEffect(()=>{
        const fetchRoomDetails=async()=>{
            const stored=JSON.parse(localStorage.getItem('student'));
            if(!stored || !stored.id){
                setError("Student not found.");
                return;
            };

            try{
                const res=await fetch(`http://localhost:8080/api/students/${stored.id}`);
                if(!res.ok){
                    throw new Error("Failed to fetch student");
                };

                const data=await res.json();
                localStorage.setItem('student', JSON.stringify(data));
                if(!data.room || !data.room.id){
                    setError("Room information not available");
                    return;
                };

                const roomRes=await fetch(`http://localhost:8080/api/rooms/${data.room.id}`);
                if(!roomRes.ok){
                    throw new Error("Room not found");
                };
                const roomData=await roomRes.json();
                setRoom(roomData);
            }
            catch(err){
                setError(err.message);
            }
        };
        fetchRoomDetails();
    },[]);

    if(error){
        return(
            <div className="text-red-500">{error}</div>
        );
    };
    if(!room){
        return(
            <div>Loading room details...</div>
        );
    };


    return (
    <div className="min-h-screen flex justify-center items-start pt-10">
        <div className="bg-white p-7 rounded shadow-2xl mt-15 w-full max-w-2xl">
        <h2 className="font-bold text-2xl text-center mb-8 border-b-2 border-gray-200 pb-5">Room Details</h2>

        <table className="w-full table-fixed border-separate border-spacing-y-4 border-spacing-x-6 mb-10">
            <tbody>
            <tr>
                <td className="font-semibold w-1/3">Room No:</td>
                <td>{room.roomNumber}</td>
            </tr>
            <tr>
                <td className="font-semibold">Block:</td>
                <td>{room.block}</td>
            </tr>
            <tr>
                <td className="font-semibold">Total Occupancy:</td>
                <td>{room.capacity}</td>
            </tr>
            <tr>
                <td className="font-semibold">Current Occupancy:</td>
                <td>{room.currentOccupancy}</td>
            </tr>
            </tbody>
        </table>

        <h3 className="font-bold text-2xl mb-4">Room Members</h3>
        <ul className="list-disc pl-6 space-y-2">
            {room.students.map((student, index) => (
            <li key={index}>
                {student.name} – {student.contactNumber}
            </li>
            ))}
        </ul>
        </div>
    </div>
    );

};