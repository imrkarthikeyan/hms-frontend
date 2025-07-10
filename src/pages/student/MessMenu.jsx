import { useEffect, useState } from "react";

export default function MessMenu(){
    const[menu, setMenu]=useState(null);
    const[error,setError]=useState('');

    useEffect(()=>{
        const fetchMenu=async()=>{
            try{
                const res=await fetch('https://hms-backend-aqwe.onrender.com/api/mess-menu/today');
                if(!res.ok){
                    throw new Error('Failed to fetch mess menu');
                }
                const data=await res.json();
                setMenu(data);
            }
            catch(err){
                console.error(err);
                setError(err.message);
            }
        };
        fetchMenu();
    },[]);

    if(error){
        return(
            <div className="text-red-600">{error}</div>
        );
    };
    if(!menu){
        return(
            <div>Loading mess menu...</div>
        );
    };


    return (
    <div className="min-h-screen flex justify-center items-start pt-10">
        <div className="bg-white p-7 mt-15 rounded shadow-2xl w-full max-w-2xl">
        <h2 className="font-bold text-2xl text-center mb-8 border-b-2 border-gray-200 pb-5">Today's Mess Menu</h2>

        <table className="w-full table-fixed border-separate border-spacing-y-6 border-spacing-x-5">
            <tbody>
            <tr>
                <td className="font-semibold w-1/3">Date:</td>
                <td>{menu.date}</td>
            </tr>
            <tr>
                <td className="font-semibold">Breakfast:</td>
                <td>{menu.breakfast}</td>
            </tr>
            <tr>
                <td className="font-semibold">Lunch:</td>
                <td>{menu.lunch}</td>
            </tr>
            <tr>
                <td className="font-semibold">Dinner:</td>
                <td>{menu.dinner}</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
    );

}