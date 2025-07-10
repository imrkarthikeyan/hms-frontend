import { useEffect, useState } from "react";

export default function WardenProfile(){

    const[warden, setWarden]=useState(null);

    useEffect(()=>{
        const fetchWarden=async()=>{
            const warden=JSON.parse(localStorage.getItem("warden"));
            if(!warden){
                return;
            };

            try{
                const res=await fetch(`https://hms-backend-aqwe.onrender.com/api/wardens/firebase/${warden.firebaseUid}`);
                const data=await res.json();
                console.log("Fetched Warden:", data);
                setWarden(data);
            }
            catch(error){
                console.error("Error fetching student :",error)
            }
        };
        fetchWarden();
    },[]);

    if(!warden){
        return(
            <div>Loading...</div>
        );
    };


    return(
        <div className="min-h-screen flex justify-center items-start pt-10">
            <div className="bg-white p-10 rounded shadow-xl w-full max-w-2xl mt-10">
                <h2 className="font-bold text-2xl text-center mb-10 border-b-2 border-gray-200 pb-5">Warden Profile</h2>

                <table className="w-full table-fixed border-separate border-spacing-y-4 border-spacing-x-6">
                    <tbody>
                        <tr>
                            <td className="font-semibold w-1/3">Name :</td>
                            <td>{warden.name}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Email :</td>
                            <td>{warden.email}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Contact No :</td>
                            <td>{warden.contactNumber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}