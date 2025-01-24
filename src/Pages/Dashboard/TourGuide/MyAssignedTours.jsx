import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

export default function MyAssignedTours() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [modalData, setModalData] = useState(null); 
    const { data: tours = [] } = useQuery({
        queryKey: [user?.email, "tour"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigntour/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    const handleAccept = async (id) => {
        try {
            await axiosSecure.patch(`/assigntour/accept/${id}`);
            alert("Tour accepted successfully!");
        } catch (error) {
            console.error("Error accepting tour:", error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axiosSecure.patch(`/assigntour/reject/${id}`);
            alert("Tour rejected successfully!");
        } catch (error) {
            console.error("Error rejecting tour:", error);
        }
    };

   
    return (
        <div className="assigned-tours-page p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                My Assigned Tours
            </h1>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full table-auto">
                    <thead className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                        <tr>
                            <th className="py-4 px-6 text-left text-lg font-semibold uppercase">
                                Package Name
                            </th>
                            <th className="py-4 px-6 text-left text-lg font-semibold uppercase">
                                Tourist Name
                            </th>
                            <th className="py-4 px-6 text-left text-lg font-semibold uppercase">
                                Tour Date
                            </th>
                            <th className="py-4 px-6 text-left text-lg font-semibold uppercase">
                                Price
                            </th>
                            <th className="py-4 px-6 text-left text-lg font-semibold uppercase">
                                Status
                            </th>
                            <th className="py-4 px-6 text-left text-lg font-semibold uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tours.map((tour) => (
                            <tr
                                key={tour.id}
                                className="hover:bg-gray-100 transition duration-200"
                            >
                                <td className="py-4 px-6 text-gray-800 text-lg">
                                    {tour.packageName}
                                </td>
                                <td className="py-4 px-6 text-gray-800 text-lg">
                                    {tour.touristName}
                                </td>
                                <td className="py-4 px-6 text-gray-800 text-lg">
                                    {tour.tourDate}
                                </td>
                                <td className="py-4 px-6 text-gray-800 text-lg">
                                    ${tour.price}
                                </td>
                                <td
                                    className={`py-4 px-6 text-lg font-semibold ${
                                        tour.status === "pending"
                                            ? "text-yellow-500"
                                            : tour.status === "accepted"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {tour.status}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleAccept(tour.id)}
                                            disabled={tour.status !== "in-review"}
                                            className={`py-2 px-4 rounded-md transition duration-300 ${
                                                tour.status === "in-review"
                                                    ? "bg-green-500 text-white hover:bg-green-600"
                                                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                                            }`}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => setModalData(tour)}
                                            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            {modalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Are you sure you want to reject this tour?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Tour Package: <strong>{modalData.packageName}</strong>
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setModalData(null)}
                                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleReject(modalData.id);
                                    setModalData(null);
                                }}
                                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
