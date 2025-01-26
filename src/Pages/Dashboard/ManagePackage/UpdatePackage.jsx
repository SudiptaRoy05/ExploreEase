import axios from "axios";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const apiKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?expiration=600000000000000000&key=${apiKey}`;

export default function UpdatePackage() {
    const axiosSecure = useAxiosSecure()
    const packageData = useLoaderData() || {};
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: packageData.name || "",
            description: packageData.description || "",
            tourPlan: packageData.tourPlan || "",
            price: packageData.price || "",
            duration: packageData.duration || "",
            destination: packageData.destination || "",
            category: packageData.category || "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            // Handle image uploads if files are provided
            let uploadedImages = [];
            if (data.image && data.image.length > 0) {
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
                uploadedImages = responses.map((res) => ({
                    imageUrl: res.data.data.display_url,
                }));
            }

            const updatedPackageData = {
                name: data.name,
                description: data.description,
                tourPlan: data.tourPlan,
                duration: data.duration,
                destination: data.destination,
                category: data.category,
                price: parseFloat(data.price),
                image: uploadedImages,
            };

            const response = await axiosSecure.patch(
                `/updatepackage/${packageData._id}`,
                updatedPackageData
            );

            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: "Package updated successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error updating package:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to update package. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 sm:p-12 bg-white text-gray-800 rounded-lg shadow-lg border border-transparent bg-gradient-to-r from-blue-500 to-green-400">
            <div className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-3xl font-semibold text-center mb-8">Update Tour Package</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Package Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: "Package name is required" })}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Package Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                            Package Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description", { required: "Description is required" })}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="4"
                            placeholder="Describe the package"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="tourPlan" className="block text-sm font-semibold text-gray-700 mb-2">
                            Tour Plan
                        </label>
                        <textarea
                            id="tourPlan"
                            {...register("tourPlan", { required: "Tour plan is required" })}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="4"
                            placeholder="Outline the tour plan"
                        />
                        {errors.tourPlan && <p className="text-red-500 text-sm mt-1">{errors.tourPlan.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            {...register("price", { required: "Price is required" })}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Price"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload Photos (Multiple Images)
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register("image")}
                            multiple
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                            Duration (Days)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            {...register("duration", { required: "Duration is required" })}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Duration"
                        />
                        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
                            Destination
                        </label>
                        <input
                            type="text"
                            id="destination"
                            {...register("destination", { required: "Destination is required" })}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Destination"
                        />
                        {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            {...register("category", { required: "Category is required" })}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Category</option>
                            <option value="Beach">Beach</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Cultural">Cultural</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`w-full py-3 ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                                } text-white rounded-md font-semibold shadow-md transition duration-300`}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Package"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
