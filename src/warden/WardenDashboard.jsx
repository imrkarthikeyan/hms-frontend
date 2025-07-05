import { Outlet } from "react-router-dom";
import WardenSidebar from "../pages/components/WardenSidebar";
import WardenNavbar from "../pages/components/WardenNavbar";

export default function WardenDashboard(){
    return(
        <div className="flex">
            <WardenNavbar/>
            <WardenSidebar/>
            <div className="ml-70 p-6 w-full">
                <Outlet/>
            </div>
        </div>
    )
}