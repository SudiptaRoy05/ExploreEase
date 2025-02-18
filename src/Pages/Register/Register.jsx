import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import { useForm } from "react-hook-form";
import registerAnimation from '../../assets/lottie/SignupLottie.json';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';



export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const formPath = location.state?.form.pathname || "/";

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const onSubmit = (data) => {
        //console.log(data);
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const image = data.image;

        createUser(email, password)
            .then((result) => {
                const user = result.user
                updateUserProfile(name, image)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            image: image,
                        }
                        axios.post('https://tourmanagement-puce.vercel.app/user', userInfo)
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful!',
                            text: `Welcome, ${user.displayName || user.email}! Your account has been created successfully.`,
                            showConfirmButton: true,
                            timer: 2000,
                        });
                        reset();
                        navigate(formPath, { replace: true })
                    })

                //console.log(user)
            }).catch((err) => {
                //console.log(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: err.message,
                    showConfirmButton: true,
                });
            })

    }

    return (
        <div className="hero bg-gray-100 min-h-screen">
            <div className="hero-content flex-col lg:flex-row items-center lg:justify-between">
                <div className="text-center lg:text-left max-w-lg">
                    <h1 className="text-4xl font-bold text-gray-800">Register now!</h1>
                    <p className="py-4 text-gray-600">
                        Create an account to join us and explore new opportunities.
                    </p>
                    <Lottie animationData={registerAnimation} className="w-60 lg:w-80 mx-auto" />
                </div>
                <div className="card bg-white w-full max-w-sm shadow-lg rounded-lg p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Enter your name"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Image URL</span>
                            </label>
                            <input
                                type="url"
                                name="image"
                                {...register("image", { pattern: { value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, message: "Invalid image URL" } })}
                                placeholder="Enter image URL"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.image && <span className="text-red-600">{errors.image.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Enter your email"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                    }
                                })}
                                placeholder="Enter your password"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-blue-500 to-green-500 w-full text-white">
                                Register
                            </button>
                        </div>
                    </form>
                    {/* socialLogin  */}
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
}
