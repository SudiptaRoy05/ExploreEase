import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

export default function MyAssignedTours() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tours = [], refetch } = useQuery({
        queryKey: ["tours", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assigntour/${user?.email}`);
            return data;
        },
    });

    const handleAccept = async (id) => {
        const status = "Accepted";
        try {
            const result = await axiosSecure.patch(`/mybooking/${id}`, { status });
            if (result.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Tour Accepted!",
                    text: "The tour has been successfully accepted.",
                    confirmButtonColor: "#3085d6",
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#d33",
            });
        }
    };

    const handleReject = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const status = "Rejected";
                    const response = await axiosSecure.patch(`/mybooking/${id}`, { status });
                    if (response.data.modifiedCount > 0) {
                        Swal.fire({
                            icon: "success",
                            title: "Tour Rejected!",
                            text: "The tour has been successfully rejected.",
                            confirmButtonColor: "#3085d6",
                        });
                        refetch();
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        confirmButtonColor: "#d33",
                    });
                }
            }
        });
    };

    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Assigned Tours</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left border-collapse border border-gray-200">
                    {/* Table Head */}
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">#</th>
                            <th className="px-4 py-2 border border-gray-300">Package Name</th>
                            <th className="px-4 py-2 border border-gray-300">Tourist Name</th>
                            <th className="px-4 py-2 border border-gray-300">Date</th>
                            <th className="px-4 py-2 border border-gray-300">Price</th>
                            <th className="px-4 py-2 border border-gray-300">Status</th>
                            <th className="px-4 py-2 border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="text-gray-700">
                        {tours.map((tour, idx) => (
                            <tr
                                key={tour._id}
                                className="even:bg-gray-50 hover:bg-gray-100"
                            >
                                <td className="px-4 py-2 border border-gray-300">{idx + 1}</td>
                                <td className="px-4 py-2 border border-gray-300">{tour.packageName}</td>
                                <td className="px-4 py-2 border border-gray-300">{tour.touristName}</td>
                                <td className="px-4 py-2 border border-gray-300">{tour.tourDate}</td>
                                <td className="px-4 py-2 border border-gray-300">${tour.price}</td>
                                <td className="px-4 py-2 border border-gray-300">{tour.status}</td>
                                <td className="px-4 py-2 border border-gray-300 flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleAccept(tour._id)}
                                        className={`px-3 py-1 rounded-lg ${tour.status === "Rejected"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                            }`}
                                        disabled={tour.status === "Rejected"}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(tour._id)}
                                        className={`px-3 py-1 rounded-lg ${tour.status === "Accepted"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-red-500 hover:bg-red-600 text-white"
                                            }`}
                                        disabled={tour.status === "Accepted"}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
