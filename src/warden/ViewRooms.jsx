import React, { useEffect, useState } from "react";

export default function ViewRooms(){
    const[rooms,setRooms]=useState([]);
    const[roomNumber,setRoomNumber]=useState("");
    const[block,setBlock]=useState("");
    const[message,setMessage]=useState("");

    const fetchRooms=async()=>{
        try{
            const res=await fetch("http://localhost:8080/api/rooms");
            const data=await res.json();
            setRooms(data);
        }
        catch(err){
            console.error("Error fetching rooms:",err);
        }
    };

    useEffect(()=>{
        fetchRooms();
    },[]);

    const handleCreateRoom=async(e)=>{
        e.preventDefault();

        const newRoom={
        roomNumber,
        block,
        capacity: 4,
        };

        try{
        const res=await fetch("http://localhost:8080/api/rooms",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newRoom),
        });

        if (!res.ok) {
            const errText=await res.text();
            throw new Error("Failed to create room: ",errText);
        }

        setMessage("Room created successfully!");
        setRoomNumber("");
        setBlock("");
        fetchRooms(); 
        }
        catch(error){
            console.error(error);
            setMessage("Error: ",error.message);
        }
    };

    return (
        <div className="p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4">All Hostel Rooms</h2>

        <form onSubmit={handleCreateRoom} className="mb-6 bg-white p-4 shadow rounded w-full max-w-lg">
            <h3 className="text-lg font-bold mb-2">Create New Room</h3>
            {message && <div className="mb-2 text-blue-600">{message}</div>}
            <div className="flex flex-col gap-3">
            <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Room Number"
                className="border p-2 rounded"
                required
            />
            <input
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                placeholder="Block"
                className="border p-2 rounded"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Create Room
            </button>
            </div>
        </form>

        <table className="w-full border border-gray-300 bg-white shadow">
            <thead className="bg-gray-100">
            <tr>
                <th className="border px-4 py-2 text-left">Room Number</th>
                <th className="border px-4 py-2 text-left">Block</th>
                <th className="border px-4 py-2 text-left">Total Capacity</th>
                <th className="border px-4 py-2 text-left">Current Occupancy</th>
            </tr>
            </thead>
            <tbody>
            {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{room.roomNumber}</td>
                <td className="border px-4 py-2">{room.block}</td>
                <td className="border px-4 py-2">{room.capacity}</td>
                <td className="border px-4 py-2">{room.currentOccupancy}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};