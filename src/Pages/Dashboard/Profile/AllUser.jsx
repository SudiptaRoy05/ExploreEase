import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import React, { useState } from "react";
import Select from "react-select";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

export default function AllUser() {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: users = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users", searchQuery, selectedRole],
        queryFn: async () => {
            const res = await axiosSecure.get("/users", {
                params: {
                    search: searchQuery,
                    role: selectedRole ? selectedRole.value : null,
                },
            });
            return res.data;
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const search = form.get("search");
        setSearchQuery(search);
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        
        // Show loading state (optional)
        Swal.fire({
            title: 'Updating...',
            text: 'Please wait while we update the user.',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
    
        try {
            const response = await axiosSecure.patch(`/user/${id}`, { name });
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'User Updated!',
                    text: 'The user information has been successfully updated.',
                });
                closeModal();
                refetch();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed!',
                    text: 'There was an issue updating the user information.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed!',
                text: 'There was an error updating the user information.',
            });
            console.error("Error updating user:", error);
        }
    };
    

    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "tourguide", label: "TourGuide" },
        { value: "tourist", label: "Tourist" },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-blue-500">Loading users...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-red-500">
                    Error: {error.message}
                </p>
            </div>
        );
    }

    return (
        <div className=" min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
                All Users
            </h2>
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <form
                    onSubmit={handleSearch}
                    className="w-full md:w-2/3 flex items-center gap-2 p-4 rounded-lg shadow-sm"
                >
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="search"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </form>

                <Select
                    options={roleOptions}
                    placeholder="Filter by Role"
                    isClearable
                    className="w-full md:w-1/3"
                    onChange={setSelectedRole}
                />
            </div>
            {/* User Table */}
            <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
                <table className="min-w-full table-auto border-collapse text-white">
                    <thead className="bg-blue-700 text-xs uppercase">
                        <tr>
                            <th className="px-3 py-2 border">#</th>
                            <th className="px-3 py-2 border">Image</th>
                            <th className="px-3 py-2 border">Name</th>
                            <th className="px-3 py-2 border">Email</th>
                            <th className="px-3 py-2 border">Role</th>
                            <th className="px-3 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-200 text-sm">
                        {users.map((user, idx) => (
                            <tr
                                key={user._id}
                                className="even:bg-gray-700 hover:bg-gray-600 transition-all"
                            >
                                <td className="px-3 py-2 border text-center">{idx + 1}</td>
                                <td className="px-3 py-2 border text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-10 w-10">
                                                <img
                                                    src={user?.image || "/default-avatar.png"}
                                                    alt={user?.name || "User Avatar"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2 border">{user?.name}</td>
                                <td className="px-3 py-2 border">{user?.email}</td>
                                <td className="px-3 py-2 border text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${user?.role === "Admin"
                                            ? "bg-green-100 text-green-600"
                                            : user?.role === "Guide"
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {user?.role || "N/A"}
                                    </span>
                                </td>
                                <td className="px-3 py-2 border text-center">
                                    <button
                                        onClick={() => openModal(user)}
                                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
                                    >
                                        <FiEdit className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Simple Modal for User Details */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className=" rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Edit User Details</h3>
                        <form onSubmit={(e) => handleUpdate(e, selectedUser._id)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    defaultValue={selectedUser?.name}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={selectedUser?.email}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    readOnly
                                    name="email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <input
                                    type="text"
                                    value={selectedUser?.role}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    readOnly
                                    name="role"
                                />
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
