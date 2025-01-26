import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const apiKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?expiration=600000000000000&key=${apiKey}`;

const AddStories = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const onSubmit = async (data) => {
        if (!data.title.trim() || !data.content.trim()) {
            return Swal.fire({
                title: "Error!",
                text: "Title and content cannot be empty.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        if (!data.image || data.image.length === 0) {
            return Swal.fire({
                title: "Error!",
                text: "At least one image is required.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        setIsSubmitting(true);
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

            const storiesRes = await axiosSecure.post('/addstories', story);

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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
                Add a New Story
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Image</span>
                    </label>
                    <input
                        type="file"
                        multiple
                        className="file-input file-input-bordered w-full focus:ring-2 focus:ring-blue-500"
                        {...register('image')}
                        onChange={handleFileChange}
                    />
                    {errors.image && <p className="text-error mt-2">{errors.image.message}</p>}
                    <div className="flex flex-wrap gap-4 mt-4">
                        {previewImages.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Preview ${index + 1}`}
                                className="w-24 h-24 rounded-lg shadow-md object-cover"
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-green-400 ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-green-400 hover:to-blue-500"
                        } transition-all shadow-lg`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Story"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStories;
