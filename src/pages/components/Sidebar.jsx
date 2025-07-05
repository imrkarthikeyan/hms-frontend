import { Link } from "react-router-dom";

export default function Sidebar(){

    const handleLogout = () => {
        localStorage.removeItem("student");
        window.location.href = "/login/warden";
    };

    return(
        <div className="w-70 bg-gray-800 text-white p-4 fixed h-screen">
            <h2 className="text-2xl font-bold mb-6 mt-16">Student Panel</h2>
            <nav className="flex flex-col gap-8">
                <Link to="/student/dashboard/profile">Profile</Link>
                <Link to="/student/dashboard/room">Room Details</Link>
                <Link to="/student/dashboard/outpass">Request for Out Pass</Link>
                <Link to="/student/dashboard/submit-complaint">Submit Complaint</Link>
                <Link to="/student/dashboard/view-complaints">View Complaints</Link>
                <Link to="/student/dashboard/mess-menu">Mess Menu</Link>
                <Link to="/student/dashboard/visit-request">Request to Parent visit</Link>
                <Link to="/student/dashboard/my-visits">Past visit Requests</Link>
                <Link to="/student/dashboard/fees">Fees Status</Link>

                <button onClick={handleLogout} className="bg-red-600 w-[70px] text-white rounded hover:bg-red-900 p-1">Logout</button>
            </nav>
        </div>
    )
}