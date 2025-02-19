import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/lottie/LoginLottie.json';
import { FaRegEnvelope, FaLock } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.from?.pathname || '/';
    const { login, forgotPass } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Please enter both email and password.',
                confirmButtonColor: '#d33',
            });
            return;
        }

        login(email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back`,
                    confirmButtonColor: '#3085d6',
                });
                navigate(fromPath, { replace: true });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonColor: '#d33',
                });
            });
    };

    const handleForgotPassword = () => {
        Swal.fire({
            title: 'Forgot Password',
            text: 'Enter your email address to reset your password.',
            input: 'email',
            inputPlaceholder: 'Enter your email',
            showCancelButton: true,
            confirmButtonText: 'Reset Password',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) return 'Please enter a valid email!';
            },
        }).then((result) => {
            if (result.isConfirmed) {
                forgotPass(result.value)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Email Sent',
                            text: 'A password reset email has been sent. Please check your inbox.',
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Unable to send reset email. Please try again.',
                        });
                    });
            }
        });
    };

    const fillAdminCredentials = () => {
        setEmail('ballavesudipta@gmail.com');
        setPassword('Aa1111!');
    };

    const fillTourGuideCredentials = () => {
        setEmail('sudiptaroyballave121@gmail.com');
        setPassword('Aa1111!');
    };

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
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pl-10"
                                    required
                                />
                            </div>
                            <label className="label">
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="label-text-alt text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-blue-500 to-green-500 w-full text-white">
                                Login
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={fillAdminCredentials}
                        className="btn mt-3 bg-gray-700 text-white w-full"
                    >
                        Click to get Admin Credential
                    </button>
                    <button
                        onClick={fillTourGuideCredentials}
                        className="btn mt-3 bg-gray-700 text-white w-full"
                    >
                        Click to get Tour Guide Credential
                    </button>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
}
