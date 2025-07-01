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


    return(
        <div className="pl-5">
            <h2 className="mt-10 font-bold text-xl">Room Details</h2>
            
            <table className="mt-3 border border-none border-separate border-spacing-y-4 border-spacing-x-4">
                <tr>
                    <td><strong>Room No :</strong></td><td>{room.roomNumber}</td>
                </tr>
                <tr className="">
                    <td><strong>Block :</strong></td><td>{room.block}</td>
                </tr>
                <tr>
                    <td><strong>Total Occupancy :</strong></td><td>{room.capacity}</td>
                </tr>
                <tr>
                    <td><strong>Current Occupancy :</strong></td><td>{room.currentOccupancy}</td>
                </tr>
            </table>
            <h3 className="mt-10 font-bold text-xl">Room Members:</h3>
            <ul className="list-disc ml-10 mt-5">
                {room.students.map((student, index) => (
                <li key={index} className="mt-3">
                    {student.name} - {student.contactNumber}
                </li>
                ))}
            </ul>
        </div>
    );
};