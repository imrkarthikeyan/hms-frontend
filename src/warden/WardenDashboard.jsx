import { Outlet } from "react-router-dom";
import WardenSidebar from "../pages/components/WardenSidebar";

export default function WardenDashboard(){
    return(
        <div className="flex">
            <WardenSidebar/>
            <div className="ml-70 p-6 w-full">
                <Outlet/>
            </div>
        </div>
    )
}