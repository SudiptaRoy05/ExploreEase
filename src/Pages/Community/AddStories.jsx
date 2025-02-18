import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const apiKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?expiration=600000000000000&key=${apiKey}`;

const AddStories = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  // Handle Image Preview
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Handle Form Submission
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
      // Upload Images to imgbb
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

      // Prepare Story Data
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

      // Send Data to Backend
      const storiesRes = await axiosSecure.post("/addstories", story);

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
      setPreviewImages([]); // Reset images after submission
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 sm:p-12  rounded-2xl shadow-2xl">
      <h2 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text text-white">
        Share Your Story
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-xl font-semibold mb-2 text-white">
            Story Title
          </label>
          <input
            type="text"
            placeholder="Enter your story title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-400 focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-500 mt-2">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-xl font-semibold mb-2 text-white">
            Story Content
          </label>
          <textarea
            placeholder="Write your story..."
            {...register("content", { required: "Content is required" })}
            className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-400 focus:outline-none h-40"
          />
          {errors.content && (
            <p className="text-red-500 mt-2">{errors.content.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xl font-semibold mb-2 text-white">
            Upload Images (Multiple)
          </label>
          <input
            type="file"
            multiple
            {...register("image")}
            onChange={handleFileChange}
            className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-4 focus:ring-blue-400 focus:outline-none"
          />
          {errors.image && (
            <p className="text-red-500 mt-2">{errors.image.message}</p>
          )}

          {/* Image Previews */}
          <div className="flex flex-wrap gap-4 mt-4">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-32 h-32 rounded-lg shadow-lg object-cover"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 text-white font-bold rounded-xl bg-blue-600 ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-green-400 hover:to-blue-500"
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
