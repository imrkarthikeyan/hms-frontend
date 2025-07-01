import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard(){
    return(
        <div className="flex">
            <Sidebar/>
            <div className="ml-70 p-6 w-full">
                <Outlet/>
            </div>
        </div>
    )
}