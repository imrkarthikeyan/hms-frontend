import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard(){
    return(
        <div className="flex">
            <Navbar/>
            <Sidebar/>
            <div className="ml-70 p-6 w-full">
                <Outlet/>
            </div>
        </div>
    )
}