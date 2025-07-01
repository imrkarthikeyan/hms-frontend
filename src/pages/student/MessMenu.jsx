import { useEffect, useState } from "react";

export default function MessMenu(){
    const[menu, setMenu]=useState(null);
    const[error,setError]=useState('');

    useEffect(()=>{
        const fetchMenu=async()=>{
            try{
                const res=await fetch('http://localhost:8080/api/mess-menu/today');
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


    return(
        <div>
            <h2 className="mt-10 font-bold text-xl pl-3">Today's Mess Menu</h2>
            <table className="mt-10 border border-none border-separate border-spacing-y-6 border-spacing-x-5">
                <tr>
                    <td><strong>Date :</strong></td><td>{menu.date}</td>
                </tr>
                <tr className="">
                    <td><strong>Breakfast :</strong></td><td>{menu.breakfast}</td>
                </tr>
                <tr>
                    <td><strong>Lunch :</strong></td><td>{menu.lunch}</td>
                </tr>
                <tr>
                    <td><strong>Dinner :</strong></td><td>{menu.dinner}</td>
                </tr>
            </table>
        </div>
    )
}