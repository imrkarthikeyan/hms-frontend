import{useEffect,useState} from "react";

export default function AssignStudent(){
  const[students,setStudents]=useState([]);
  const[rooms,setRooms]=useState([]);
  const[wardens,setWardens]=useState([]);
  const[assignments,setAssignments]=useState({});
  const[message,setMessage]=useState("");
  const[error,setError]=useState("");

  useEffect(()=>{
    const fetchStudents=async()=>{
      const res=await fetch("https://hms-backend-aqwe.onrender.com/api/students");
      const data=await res.json();
      setStudents(data);
   };
    fetchStudents();
 },[]);

  useEffect(()=>{
    const fetchRooms=async()=>{
      const res=await fetch("https://hms-backend-aqwe.onrender.com/api/rooms");
      const data=await res.json();
      setRooms(data);
   };
    fetchRooms();
 },[]);

  useEffect(()=>{
    const fetchWardens=async()=>{
      const res=await fetch("https://hms-backend-aqwe.onrender.com/api/wardens");
      const data=await res.json();
      setWardens(data);
   };
    fetchWardens();
 },[]);

  const handleAssignChange=(studentId,key,value)=>{
    setAssignments(prev=>({...prev,[studentId]:{...prev[studentId],[key]:value
     }
   }));
 };

  const handleSubmit=async(studentId)=>{
    setError("");
    setMessage("");

    const{roomId,wardenId}=assignments[studentId] ||{};
    if(!roomId || !wardenId){
      setError("Please select both Room and Warden");
      return;
    }

    try{
      const res=await fetch(`https://hms-backend-aqwe.onrender.com/api/students/${studentId}/assign`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({roomId,wardenId})
     });

      if(!res.ok) throw new Error("Assignment failed");

      setMessage("Student assigned successfully");
      setStudents(prev=>prev.filter(s=>s.id!==studentId));
   } catch(err){
      console.error(err);
      setError("Assignment failed");
   }
 };

  return(
    <div className="p-6 w-full mt-10">
      <h2 className="font-bold text-2xl py-6">Assign Students</h2>

     {message && <p className="text-green-600 mb-4">{message}</p>}
     {error && <p className="text-red-600 mb-4">{error}</p>}

     {students.filter(s=>!s.room).length === 0 ?(
        <p>No unassigned students.</p>
      ) :(
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Room</th>
              <th className="border px-4 py-2">Warden</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
           {students.filter(s=>!s.room).map(student=>(
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={assignments[student.id]?.roomId || ""}
                    onChange={(e) =>
                      handleAssignChange(student.id,"roomId",Number(e.target.value))
                   }
                  >
                    <option value="">Select Room</option>
                   {rooms.map(room=>(
                      <option key={room.id} value={room.id}>
                       {room.roomNumber} - Block{room.block}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={assignments[student.id]?.wardenId || ""}
                    onChange={(e) =>
                      handleAssignChange(student.id,"wardenId",Number(e.target.value))
                   }
                  >
                    <option value="">Select Warden</option>
                   {wardens.map(w=>(
                      <option key={w.id} value={w.id}>
                       {w.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={()=>handleSubmit(student.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
