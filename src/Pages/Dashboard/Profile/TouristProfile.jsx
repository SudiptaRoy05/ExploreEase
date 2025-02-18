import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useTourist from "../../../Hooks/useTourist";

function TouristProfile() {
    const { user, updateUserProfile } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setModalOpen] = useState(false);

    const { data: users = {} } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data;
        },
    });

    const handleEdit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const updatedData = Object.fromEntries(form.entries());

        try {
            setModalOpen(false);
            await axiosSecure.patch(`/user/${user?.email}`, updatedData);
            await updateUserProfile(updatedData.displayName, updatedData.photoURL);

            Swal.fire({
                title: "Profile Updated",
                text: "Your profile has been successfully updated.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            Swal.fire({
                title: "Update Failed",
                text: "There was an issue updating your profile.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const [isTourist] = useTourist();

    return (
        <div className=" rounded-lg shadow-lg text-white  flex flex-col items-center">
            {/* Profile Header */}
            <div className="w-full py-6 flex flex-col md:flex-row items-center md:items-start">
                {/* Profile Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-full h-full rounded-full border-4 border-gray-200 shadow-md"
                    />
                </div>

                {/* Profile Info */}
                <div className="md:ml-6 flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold">
                        {user?.displayName ? `Welcome, ${user?.displayName}!` : "Welcome, Guest!"}
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg mt-1">
                        {user?.email || "No email provided"}
                    </p>
                    <span className="inline-block bg-blue-600 text-white text-xs md:text-sm px-4 py-1 rounded-full font-semibold mt-2">
                        {users?.role || "User"}
                    </span>

                    {/* Profile Actions */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition transform hover:scale-105"
                            onClick={() => setModalOpen(true)}
                        >
                            Edit Profile
                        </button>
                        {isTourist && (
                            <Link
                                to="/dashboard/tourguide"
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 transition transform hover:scale-105 text-center"
                            >
                                Apply for Tour Guide
                            </Link>
                        )}
                    </div>
                </div>
            </div>


            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md p-4">
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md transform transition-all animate-fadeIn relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
                            onClick={() => setModalOpen(false)}
                        >
                            ✕
                        </button>

                        {/* Modal Header */}
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-800">
                            Edit Profile
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500 text-center mb-5">
                            Update your profile details below.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleEdit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    defaultValue={user?.displayName || ""}
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Profile Picture */}
                            <div>
                                <label className="block text-gray-700 font-semibold">Profile Picture URL</label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    defaultValue={user?.photoURL || ""}
                                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email (Read-Only) */}
                            <div>
                                <label className="block text-gray-700 font-semibold">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
                                    readOnly
                                />
                            </div>

                            {/* Role (Read-Only) */}
                            <div>
                                <label className="block text-gray-700 font-semibold">Role</label>
                                <input
                                    type="text"
                                    value={users?.role || "User"}
                                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
                                    readOnly
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition focus:outline-none"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition focus:outline-none"
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
