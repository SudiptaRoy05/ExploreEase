import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLoaderData } from 'react-router-dom';

export default function UpdateStories() {
    const story = useLoaderData();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: story?.title || '',
            content: story?.content || '',
        },
    });
    const { user } = useContext(AuthContext);

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
                Update Story
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Title</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <p className="text-error mt-2">{errors.title.message}</p>}
                </div>

                {/* Content */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Content</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered w-full h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        {...register('content', { required: 'Content is required' })}
                    ></textarea>
                    {errors.content && <p className="text-error mt-2">{errors.content.message}</p>}
                </div>

                {/* Image */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Image</span>
                    </label>
                    <input
                        type="file"
                        multiple
                        className="file-input file-input-bordered w-full focus:ring-2 focus:ring-blue-500"
                        {...register('image', { required: 'Image is required' })}
                    />
                    {errors.image && <p className="text-error mt-2">{errors.image.message}</p>}
                </div>

                {/* User Information */}
                <div className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="User"
                            className="w-16 h-16 rounded-full border-2 border-blue-500"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
                            {user?.displayName ? user.displayName[0] : "A"}
                        </div>
                    )}
                    <div>
                        <p className="text-lg font-medium text-gray-800">{user?.displayName || "Anonymous"}</p>
                        <p className="text-sm text-gray-500">{user?.email || "Not provided"}</p>
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-blue-500 transition-all shadow-lg"
                    >
                        Update Story
                    </button>
                </div>
            </form>
        </div>
    );
}
