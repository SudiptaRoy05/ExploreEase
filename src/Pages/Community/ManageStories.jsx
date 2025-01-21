import React from 'react';
import { useLoaderData } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons

function ManageStories() {
    const stories = useLoaderData();
    console.log(stories);

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
                                <button className="btn btn-sm btn-primary flex items-center space-x-2">
                                    <FaEdit className="h-5 w-5" />
                                </button>
                                <button className="btn btn-sm btn-secondary flex items-center space-x-2">
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
