import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function MyBooking() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch bookings using React Query
    const { data: bookings = [], isLoading, isError, error } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mybooking/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <p className="text-center text-lg text-gray-600">Loading bookings...</p>;
    if (isError) return <p className="text-center text-lg text-red-600">Error: {error.message}</p>;

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
                                    key={booking.id}
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
                                        {booking.status.charAt(0).toUpperCase() +
                                            booking.status.slice(1)}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-4">
                                            {booking.status === "pending" && (
                                                <>
                                                    <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-sm transition duration-300">
                                                        Pay
                                                    </button>
                                                    <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-sm transition duration-300">
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
        </div>
    );
}
