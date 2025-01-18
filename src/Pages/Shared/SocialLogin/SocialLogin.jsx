import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SocialLogin() {
    const navigate = useNavigate();
    const { googleLogin } = useContext(AuthContext);
    const handelSocialLogin = () => {
        googleLogin()
            .then((result) => {
                console.log(result)
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image: result.user?.photoURL,
                }
                axios.post('http://localhost:5000/user', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                    navigate('/')
            })
    }

    return (
        <div className="form-control mt-4">
            <button onClick={handelSocialLogin} className="btn btn-outline btn-google w-full flex items-center justify-center space-x-2 text-gray-700 border-gray-400 hover:bg-gray-200">
                <FaGoogle className="text-xl text-red-500" />
                <span className="text-gray-700 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500">
                    Continue with Google
                </span>
            </button>
        </div>
    )
}
