import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/lottie/LoginLottie.json'; // Replace with your actual path
import { FaRegEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';


export default function Login() {
    const { login } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.target)
        const email = form.get('email');
        const password = form.get('password');

        login(email, password)
            .then((result) => {
                const user = result.user
                console.log(user);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back,`,
                    confirmButtonColor: '#3085d6',
                });
            }).catch((err) => {
                console.log(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonColor: '#d33',
                });
            })
    }
    return (
        <div className="hero bg-gray-100 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse items-center lg:justify-between">
                <div className="text-center lg:text-left max-w-lg">
                    <h1 className="text-4xl font-bold text-gray-800">Login now!</h1>
                    <p className="py-4 text-gray-600">
                        Please enter your credentials to access your account and continue.
                    </p>
                    <Lottie animationData={loginAnimation} className="w-60 lg:w-80 mx-auto" />
                </div>
                <div className="card bg-white w-full max-w-sm shadow-lg rounded-lg p-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Email</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <FaRegEnvelope />
                                </span>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Password</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pl-10"
                                    required
                                />
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt text-blue-600 hover:underline">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-blue-500 to-green-500 w-full text-white">
                                Login
                            </button>
                        </div>

                    </form>
                    <div className="form-control mt-4">
                        <button className="btn btn-outline btn-google w-full flex items-center justify-center space-x-2 text-gray-700 border-gray-400 hover:bg-gray-200">
                            <FaGoogle className="text-xl text-red-500" />
                            <span className="text-gray-700 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500">
                                Continue with Google
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
