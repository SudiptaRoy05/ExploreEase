import React from "react";

export default function AddPackage() {
  return (
    <div className="p-6 sm:p-12 bg-white text-gray-800 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400">
      <h2 className="text-3xl font-semibold text-center mb-8">Add New Tour Package</h2>
      <form className="space-y-6">
        {/* Package Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Package Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Package Name"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Package Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Describe the package"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Price"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="imageUpload" className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Photos (Multiple Images)
          </label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            multiple
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
            Duration (Days)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Duration"
          />
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Destination"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            <option value="Beach">Beach</option>
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
          </select>
        </div>

        {/* Contact Info */}
        <div>
          <label htmlFor="contact" className="block text-sm font-semibold text-gray-700 mb-2">
            Contact Information
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Contact Information"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
}
