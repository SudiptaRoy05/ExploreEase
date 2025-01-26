import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useTourist from "../../../Hooks/useTourist";

function TouristProfile() {
    const { user, updateUserProfile } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const { data: users = [] } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            console.log(res.data);
            return res.data;
        },
    })

    const handleEdit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const updatedData = Object.fromEntries(form.entries());
        const name = form.get("displayName");
        const image = form.get("photoURL");
        console.log("Updated Data:", updatedData);

        try {
            setModalOpen(false);
            const response = await axiosSecure.patch(
                `/user/${user?.email}`,
                updatedData
            );

            console.log("Server Response:", response.data);
            updateUserProfile(name, image)
                .then((result) => {
                    console.log("Updated user profile locally:", result);
                });

            Swal.fire({
                title: "Profile Updated",
                text: "Your profile has been successfully updated.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error("Error updating profile:", error);

            Swal.fire({
                title: "Update Failed",
                text: "There was an issue updating your profile. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };


    // const [iaAdmin] = useAdmin();
    //     const [isTourGuide] = useTourGuide();
    const [isTourist] = useTourist();

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-xl">
            {/* Welcome Message */}
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
                Welcome, {user?.displayName || "Guest"}!
            </h1>

            {/* User Information */}
            <div className="flex flex-col items-center space-y-6">
                {/* Profile Picture */}
                <div className="relative">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt="User Profile"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
                    />
                </div>

                {/* User Details */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {user?.displayName || "Anonymous User"}
                    </h2>
                    <p className="text-gray-500">{user?.email || "No email provided"}</p>
                    <span className="inline-block bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full font-semibold">
                        {users?.role || "User"}
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                        onClick={() => setModalOpen(true)}
                    >
                        Edit Profile
                    </button>
                    {
                        isTourist && (
                            <>
                                <Link
                                    to="/dashboard/tourguide"
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition"
                                >
                                    Apply for Tour Guide
                                </Link>
                            </>
                        )
                    }

                </div>
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100 animate-fadeIn">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition"
                            onClick={() => setModalOpen(false)}
                            aria-label="Close Modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Modal Header */}
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                            Edit Profile
                        </h2>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Update your profile details below.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleEdit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="displayName"
                                    defaultValue={user?.displayName || ""}
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Profile Picture */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Profile Picture URL
                                </label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    defaultValue={user?.photoURL || ""}
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
                                    readOnly
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={users?.role || "User"}
                                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
                                    readOnly
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition focus:outline-none"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition focus:outline-none"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default TouristProfile;
