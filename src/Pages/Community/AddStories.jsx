import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const apiKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?expiration=600000000000000&key=${apiKey}`;

const AddStories = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, loading } = useContext(AuthContext);

    const onSubmit = async (data) => {
        if (data.image && data.image.length > 0) {
            try {
                const uploadPromises = Array.from(data.image).map((file) => {
                    const formData = new FormData();
                    formData.append("image", file);

                    return axios.post(imageHostingApi, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                });

                const responses = await Promise.all(uploadPromises);

                const uploadedImages = responses.map((res) => ({
                    imageUrl: res.data.data.display_url,
                }));

                const story = {
                    title: data.title,
                    content: data.content,
                    images: uploadedImages,
                    user: {
                        name: user?.displayName || "Anonymous",
                        email: user?.email || "Not provided",
                        image: user?.photoURL || null,
                    },
                };

                const storiesRes = await axios.post('http://localhost:5000/addstories', story);

                if (storiesRes.status === 200) {
                    Swal.fire({
                        title: "Success!",
                        text: "Story has been added successfully.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error("Error uploading images", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error uploading the images. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
                Add a New Story
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
                       {loading?'Processing...':'Submit Story'} 
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStories;
