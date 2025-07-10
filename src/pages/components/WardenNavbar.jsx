import { useEffect, useState } from 'react';
import ksr from '../../assets/ksr.jpeg';

export default function WardenNavbar(){

    const[warden,setWarden]=useState(null);

    useEffect(()=>{
        const fetchWarden=async()=>{
            const warden=JSON.parse(localStorage.getItem("warden"));
            if(!warden || !warden.id){
                return;
            }

            try{
                const res=await fetch(`https://hms-backend-aqwe.onrender.com/api/wardens/firebase/${warden.firebaseUid}`);
                const data=await res.json();
                setWarden(data);
            }
            catch{
                console.error("Error fetching warden:", err);
            }
        };
        fetchWarden();
    },[]);

    if(!warden){
        return(
            <div>Loading...</div>
        );
    }

    return(
        <div className="bg-gray-800 t-0 w-full fixed text-white p-4 flex items-center border-b border-gray-500 z-10 pl-5 h-[65px]">
            <div className="w-full flex justify-between items-center">
                <div className="text-yellow-300 font-bold flex gap-6 items-center">
                    <img src={ksr} alt="hms" className="h-10 w-10 rounded-xl" />
                    <div>
                        <h2>K. S. Rangasamy College of Technology</h2>
                        <h3>Hostel Management System</h3>
                    </div>
                </div>
                <div className="mr-5">
                    <h2>{warden.name}</h2>
                </div>
            </div>
        </div>
    )
}