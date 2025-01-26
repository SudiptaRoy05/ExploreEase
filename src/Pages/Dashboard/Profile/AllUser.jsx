import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import React, { useState } from "react";
import Select from "react-select";

export default function AllUser() {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);

    const { data: users = [], isLoading, isError, error } = useQuery({
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
    const handleSearch = e => {
        e.preventDefault();
        const form = new FormData(e.target)
        const search = form.get('search')
        setSearchQuery(search)

    }

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
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                All Users
            </h2>
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <form
                    onSubmit={handleSearch}
                    className="w-full md:w-2/3 flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm"
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
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-blue-500 text-white text-sm uppercase">
                        <tr>
                            <th className="px-4 py-3 border">#</th>
                            <th className="px-4 py-3 border">Image</th>
                            <th className="px-4 py-3 border">Name</th>
                            <th className="px-4 py-3 border">Email</th>
                            <th className="px-4 py-3 border">Role</th>
                            {/* <th className="px-4 py-3 border">Action</th> */}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {users.map((user, idx) => (
                            <tr
                                key={user._id}
                                className="even:bg-gray-50 hover:bg-gray-100 transition-all"
                            >
                                <td className="px-4 py-3 border text-center">{idx + 1}</td>
                                <td className="px-4 py-3 border text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user?.image || "/default-avatar.png"}
                                                    alt={user?.name || "User Avatar"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 border">{user?.name}</td>
                                <td className="px-4 py-3 border">{user?.email}</td>
                                <td className="px-4 py-3 border text-center">
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
