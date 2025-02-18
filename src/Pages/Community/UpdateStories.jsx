import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const apiKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?expiration=600000000000000000&key=${apiKey}`;

export default function UpdateStories() {
    const { setLoading, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const story = useLoaderData();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: story?.title || '',
            content: story?.content || '',
        },
    });
    const { user } = useContext(AuthContext);

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            let uploadedImages = [];
            if (data.image && data.image.length > 0) {
                const files = Array.from(data.image);
                const uploadPromises = files.map((file) => {
                    const formData = new FormData();
                    formData.append('image', file);

                    return axios.post(imageHostingApi, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                });

                const responses = await Promise.all(uploadPromises);
                uploadedImages = responses.map((res) => ({
                    imageUrl: res.data.data.display_url,
                }));
            }

            const updatedStories = {
                title: data?.title,
                content: data?.content,
                image: [...(story.images || []), ...uploadedImages],
            };

            const response = await axiosSecure.patch(`/story/details/${story._id}`, updatedStories);
            //console.log("Updated response:", response.data);

            if (response.status === 200) {
                reset();
                Swal.fire({
                    title: 'Success!',
                    text: 'Story updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error updating story:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to update story. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
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
                        {...register('image', {
                            validate: (value) => value?.length > 0 || story.images?.length > 0 || 'At least one image is required',
                        })}
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
                            {user?.displayName ? user.displayName[0] : 'A'}
                        </div>
                    )}
                    <div>
                        <p className="text-lg font-medium text-gray-800">{user?.displayName || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">{user?.email || 'Not provided'}</p>
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-green-400 transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-400 hover:to-blue-500'
                            }`}
                    >
                        {loading ? 'Updating...' : 'Update Story'}
                    </button>
                </div>
            </form>
        </div>
    );
}
