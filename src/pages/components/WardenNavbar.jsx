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
                const res=await fetch(`http://localhost:8080/api/wardens/firebase/${warden.firebaseUid}`);
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
        <div className="fixed bg-gray-800  w-full text-white p-4 flex  pb-6 items-center border-b-1 border-gray-500 z-1 pl-5 h-[65px]">
            <div className='v-screen justify-between items-center w-full flex fixed'>
                <div className="text-yellow-300 font-bold flex gap-6 items-center">
                    <div className=''>
                        <img src={ksr} alt="hms" className='h-10 w-10 rounded-xl'/>
                    </div>
                    <div className=''>
                        <h2 className="">K. S. Rangasamy College of Technology</h2>
                        <h3>Hostel Manangement System</h3>
                    </div>
                </div>
                <div className="mr-10 ">
                    <h2>{warden.name}</h2>
                </div>
            </div>
        </div>
    )
}