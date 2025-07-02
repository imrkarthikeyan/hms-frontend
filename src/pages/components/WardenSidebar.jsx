import { Link } from "react-router-dom";

export default function WardenSidebar(){

    const handleLogout = () => {
        localStorage.removeItem("warden");
        window.location.href = "/login/warden";
    };

    return(
        <div className="w-70 bg-gray-800 text-white p-4 fixed h-screen">
            <h2 className="text-2xl font-bold mb-6 mt-5">Warden Panel</h2>
            <nav className="flex flex-col gap-8">
                <Link to="/warden/dashboard/profile">Profile</Link>
                <Link to="/warden/dashboard/students">View Students</Link>
                <Link to="/warden/dashboard/rooms">View Rooms</Link>
                <Link to="/warden/dashboard/update-menu">Update Mess Menu</Link>
                <Link to="/warden/dashboard/manage-visitors">Manage Visitors</Link>
                <Link to="/warden/dashboard/manage-complaints">Manage Complaints</Link>
                <Link to="/warden/dashboard/assign-student">Assign Students</Link>

                <button onClick={handleLogout} className="bg-red-600 w-[70px] text-white rounded hover:bg-red-900 p-1">Logout</button>
            </nav>
        </div>
    )
}