import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children,role}){
    const student=JSON.parse(localStorage.getItem('student'));
    const warden=JSON.parse(localStorage.getItem('warden'));

    if(role==='student' && !student){
        return <Navigate to="/login/student" replace/>
    };
    if(role==='warden' && !warden){
        return <Navigate to="/login/warden" replace/>
    };

    return children;
};