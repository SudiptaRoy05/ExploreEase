import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

function ManageStories() {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stories = [], refetch } = useQuery({
        queryKey: ['stories', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/stories/${user.email}`);
            return data;
        },
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const { data } = await axiosSecure.delete(`/deletestory/${id}`);
                if (data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Your story has been deleted.', 'success');
                    await refetch();
                }
            } catch (error) {
                Swal.fire('Error!', 'There was an issue deleting the story.', 'error');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 sm:p-12 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-12">
                Manage Your Stories
            </h1>

            {stories.length === 0 ? (
                <div className="text-center text-gray-500 font-medium">
                    <p>No stories available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map(story => (
                        <div
                            key={story._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                        >
                            <figure className="relative">
                                <img
                                    src={story.images[0]?.imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                                    alt={story.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4">
                                    <h2 className="text-lg font-bold truncate">{story.title}</h2>
                                </div>
                            </figure>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">
                                    {story.content.slice(0, 100)}...
                                </p>
                                <div className="flex justify-between items-center">
                                    <Link to={`/dashboard/updatestories/${story._id}`}>
                                        <button className="btn btn-sm bg-blue-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-600">
                                            <FaEdit className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(story._id)}
                                        className="btn btn-sm bg-red-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        <FaTrash className="h-4 w-4" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManageStories;
