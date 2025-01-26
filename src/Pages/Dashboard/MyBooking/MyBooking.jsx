import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Payment from "../../Payment/Payment";
import Swal from "sweetalert2";

export default function MyBooking() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [selectedBooking, setSelectedBooking] = useState(null); // Booking to pass to Payment component

    // Fetch bookings using React Query
    const { data: bookings = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mybooking/${user?.email}`);
            console.log(bookings)
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <p className="text-center text-lg text-gray-600">Loading bookings...</p>;
    if (isError) return <p className="text-center text-lg text-red-600">Error: {error.message}</p>;

    // Open modal with selected booking
    const handleOpenModal = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
        refetch();
    };

    const handleCancelBooking = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you really want to cancel this booking? This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, cancel it!",
            });

            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/mybooking/${id}`);
                console.log(data);

                Swal.fire({
                    icon: "success",
                    title: "Booking Cancelled!",
                    text: "Your booking has been successfully cancelled.",
                    timer: 3000,
                    timerProgressBar: true,
                });
                refetch();
            }
        } catch (err) {
            console.error("Error cancelling booking:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to cancel the booking. Please try again.",
            });
        }
    };


    return (
        <div className="my-bookings-page p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                My Bookings
            </h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full table-auto">
                    <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                        <tr>
                            <th className="py-4 px-6 text-left text-lg font-semibold uppercase">
                                Package Name
                            </th>
                            <th className="py-4 px-6 text-left text-lg font-semibold uppercase">
                                Tour Guide Name
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
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="hover:bg-gray-100 transition duration-200"
                                >
                                    <td className="py-4 px-6 text-gray-800 text-lg">
                                        {booking.packageName}
                                    </td>
                                    <td className="py-4 px-6 text-gray-800 text-lg">
                                        {booking.guideName}
                                    </td>
                                    <td className="py-4 px-6 text-gray-800 text-lg">
                                        {new Date(booking.tourDate).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-gray-800 text-lg">
                                        ${booking.price}
                                    </td>
                                    <td
                                        className={`py-4 px-6 text-lg font-semibold ${booking.status === "pending"
                                            ? "text-yellow-500"
                                            : booking.status === "accepted"
                                                ? "text-green-500"
                                                : "text-red-500"
                                            }`}
                                    >
                                        {booking.status}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-4">
                                            {booking.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() => handleOpenModal(booking)}
                                                        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-sm transition duration-300"
                                                    >
                                                        Pay
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancelBooking(booking._id)}
                                                        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-sm transition duration-300">
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-4 px-6 text-center text-gray-600 text-lg"
                                >
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✖
                        </button>
                        <Payment selectedBooking={selectedBooking} />
                    </div>
                </div>
            )}
        </div>
    );
}
