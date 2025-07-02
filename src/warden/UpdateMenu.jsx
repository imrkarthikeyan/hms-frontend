import { useEffect } from "react";
import { useState } from "react";

export default function UpdateMenu(){

    const[date,setDate]=useState(()=>new Date().toISOString().split("T")[0]);
    const[breakfast,setBreakfast]=useState("");
    const[lunch,setLunch]=useState("");
    const[dinner,setDinner]=useState("");
    const[error,setError]=useState("");
    const[message,setMessage]=useState("");

    useEffect(()=>{
        const fetchMenu=async()=>{
            try{
                const res=await fetch(`http://localhost:8080/api/mess-menu/date/${date}`);
                if(!res.ok){
                    return;
                };
                const data=await res.json();
                setBreakfast(data.breakfast || "");
                setLunch(data.lunch || "");
                setDinner(data.dinner || "");
            }
            catch(err){
                console.error("Failed to load menu",err);
                setError("Failed to load menu. Please try again later.");
            }
        };
        fetchMenu();
    },[date]);

    const handleUpdate=async(e)=>{
        e.preventDefault();
        setError("");
        setMessage("");

        const menuData={date, breakfast, lunch, dinner};

        try{
            const res=await fetch("http://localhost:8080/api/mess-menu",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(menuData)
            });

            if(!res.ok){
                throw new Error("Failed to update menu");
            };
            setMessage("Menu updated successfully!");
        }
        catch(err){
            console.error("Failed to update menu",err);
            setError("Failed to update menu. Please try again later.");
        }
    };


    return(
        <div className="p-6 w-full max-w-xl mx-auto">
            <h2 className="font-bold text-2xl py-6">Update Mess Menu</h2>
            {error && <div className="text-red-600">{error}</div>}
            {message && <div className="text-green-600">{message}</div>}

            <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                    <label className="block font-medium mb-1">Date</label>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required className="w-full border p-2 rounded"/>
                </div>
                <div>
                    <label className="block font-medium mb-1">Breakfast</label>
                    <input type="text" value={breakfast} onChange={(e)=>setBreakfast(e.target.value)} required className="w-full border p-2 rounded" placeholder="Enter breakfast menu"/>
                </div>
                <div>
                    <label className="block font-medium mb-1">Lunch</label>
                    <input type="text" value={lunch} onChange={(e)=>setLunch(e.target.value)} required className="w-full border p-2 rounded" placeholder="Enter lunch menu"/>
                </div>
                <div>
                    <label className="block font-medium mb-1">Dinner</label>
                    <input type="text" value={dinner} onChange={(e)=>setDinner(e.target.value)} required className="w-full border p-2 rounded" placeholder="Enter dinner menu"/>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">Update Menu</button>
            </form>
        </div>
    );
};