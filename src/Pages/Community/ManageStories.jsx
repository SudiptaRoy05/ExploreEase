import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';

function ManageStories() {
    const { user } = useContext(AuthContext);

    const { data: stories = [], refetch } = useQuery({
        queryKey: ['stories', user.email], // Unique key for the query
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/stories/${user.email}`);
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
                const { data } = await axios.delete(`http://localhost:5000/deletestory/${id}`);
                console.log(data);

                if (data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Your story has been deleted.', 'success');
                    await refetch(); // Trigger a manual refresh of the stories data
                }
            } catch (error) {
                console.error('Error deleting story:', error);
                Swal.fire('Error!', 'There was an issue deleting the story.', 'error');
            }
        }
    };


    return (
        <div className="max-w-7xl mx-auto p-6 sm:p-12">
            <h1 className="text-3xl font-bold mb-8">Manage Stories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map(story => (
                    <div key={story._id} className="card card-compact bg-white shadow-xl">
                        <figure>
                            <img
                                src={story.images[0]?.imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                                alt={story.title}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{story.title}</h2>
                            <p className="text-gray-600">{story.content.slice(0, 100)}...</p>
                            <div className="flex justify-between items-center mt-4">
                                <Link to={`/dashboard/updatestories/${story._id}`}>
                                    <button className="btn btn-sm btn-primary flex items-center space-x-2">
                                        <FaEdit className="h-5 w-5" />
                                    </button>
                                </Link>
                                <button onClick={() => handleDelete(story._id)} className="btn btn-sm btn-secondary flex items-center space-x-2">
                                    <FaTrash className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageStories;
