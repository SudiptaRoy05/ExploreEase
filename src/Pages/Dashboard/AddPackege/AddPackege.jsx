import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const apiKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?expiration=600000000000000&key=${apiKey}`;

export default function AddPackage() {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.image && data.image.length > 0) {
      try {
        const uploadPromises = Array.from(data.image).map((file) => {
          const formData = new FormData();
          formData.append("image", file);
          return axios.post(imageHostingApi, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        });

        const responses = await Promise.all(uploadPromises);
        const uploadedImages = responses.map((res) => ({
          imageUrl: res.data.data.display_url,
        }));

        const packageData = {
          name: data.name,
          description: data.description,
          tourPlan: data.tourPlan,
          duration: data.duration,
          destination: data.destination,
          category: data.category,
          price: parseFloat(data.price),
          image: uploadedImages,
        };

        const packageRes = await axiosSecure.post("/addpackage", packageData);
        if (packageRes.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Package has been added successfully.",
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
    <div className="w-full max-w-7xl mx-auto p-6 sm:p-8 lg:p-12 rounded-lg shadow-lg ">
      <h2 className="text-4xl font-bold text-center text-white mb-10">Add New Tour Package</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Package Name */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Package Name</label>
          <input
            type="text"
            {...register("name", { required: "Package name is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Package Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Description & Tour Plan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Package Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="4"
              placeholder="Describe the package"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Tour Plan</label>
            <textarea
              {...register("tourPlan", { required: "Tour plan is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="4"
              placeholder="Outline the tour plan"
            />
            {errors.tourPlan && <p className="text-red-500 text-sm mt-1">{errors.tourPlan.message}</p>}
          </div>
        </div>

        {/* Price & Image Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter Price"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Upload Photos</label>
            <input
              type="file"
              {...register("image", { required: "Select multiple images" })}
              multiple
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Duration & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Duration (Days)</label>
            <input
              type="number"
              {...register("duration", { required: "Duration is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter Duration"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Destination</label>
            <input
              type="text"
              {...register("destination", { required: "Destination is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter Destination"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="Beach">Beach</option>
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
}
