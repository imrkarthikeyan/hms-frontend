import { useNavigate } from 'react-router-dom';


export default function RoleSelect(){
    

    const navigate = useNavigate();



    return(
        <div className="flex items-center min-h-screen justify-center gap-80">
            <div>
                <h1 className='font-bold text-[Blue] text-3xl pb-5'>Register</h1>
                <p className='text-gray-600 pb-5'>Don't have an account yet?</p>
                <button onClick={()=>navigate('/signup/student')} className='bg-[Blue] rounded pl-5 pr-5 pb-2 pt-2 text-white text-[18px]'>SignUp</button>
            </div>
            <div>
                <h1 className='font-bold text-[Blue] text-3xl pb-5'>Exixting User</h1>
                <p className='text-gray-600 pb-5'>Login to your Account</p>
                <div>
                    <label className='pr-2'>Select Role</label>
                    <select className='border'>
                        <option onClick={()=>navigate('/login/student')}>Student</option>
                        <option onClick={()=>navigate('/login/warden')}>Warden</option>
                    </select>
                </div>
            </div>
        </div>
    )
}