import ksr from '../../assets/ksr.jpeg';
import { useNavigate } from 'react-router-dom';


export default function RoleSelect(){
    

    const navigate = useNavigate();



    return(
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-800 top-0 w-full fixed text-white p-4 flex items-center border-b border-gray-500 z-10 h-[65px]">
                <div className="w-full flex justify-between items-center px-2 sm:px-5">
                    <div className="text-yellow-300 font-bold flex gap-3 sm:gap-6 items-center">
                        <img src={ksr} alt="hms" className="h-10 w-10 rounded-xl" />
                        <div className='text-sm sm:text-base'>
                            <h2>K. S. Rangasamy College of Technology</h2>
                            <h3>Hostel Management System</h3>
                        </div>
                    </div>
                    <div className="text-sm sm:text-base">
                        <h2>Home</h2>
                    </div>
                </div>
            </div>
            <div className='flex flex-1 items-center justify-center gap-80 pt-28 px-4'>
                <div className='flex flex-col md:flex-row items-center justify-center gap-10 md:gap-32 w-full max-w-4xl'>
                    <div className='pl-17 pb-13 md:pl-0 md:pb-0 w-full max-w-xs'>
                        <h1 className='font-bold text-[Blue] text-3xl pb-5'>Register</h1>
                        <p className='text-gray-600 pb-5'>Don't have an account yet?</p>
                        <button onClick={()=>navigate('/signup/student')} className='bg-[Blue] cursor-pointer rounded pl-5 pr-5 pb-2 pt-2 text-white text-[18px]'>SignUp</button>
                    </div>
                    <div>
                        <h1 className='font-bold text-[Blue] text-3xl pb-5'>Exixting User</h1>
                        <p className='text-gray-600 pb-5'>Login to your Account</p>
                        <div>
                            <select onChange={(e)=>navigate(`/login/${e.target.value}`)} className='w-full border-2 cursor-pointer rounded p-1 pl-4 pr-4 text-lg appearance-none border-blue-700 '>
                                <option value="" disabled selected>Select Role</option>
                                <option value="student">Student</option>
                                <option value="warden">Warden</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-center mt-auto mb-7'>© created by <span className='text-blue-700'>rkarthikeyan</span></p>
        </div>
    )
}