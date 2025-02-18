import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function ManagePackage() {
    const axiosSecure = useAxiosSecure();
    const { data: packages = [], refetch } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allpackage');
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (!confirmation.isConfirmed) return;

        try {
            const response = await axiosSecure.delete(`/package/${id}`);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The package has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                refetch();
            }
        } catch (error) {
            console.error("Error deleting package:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete the package. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
            <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800 p-4">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Manage Packages</h2>
                <table className="table-auto w-full border-collapse border border-gray-700">
                    {/* Head */}
                    <thead className="bg-gray-700 text-gray-200">
                        <tr>
                            <th className="py-4 px-6 text-left border-b border-gray-600">#</th>
                            <th className="py-4 px-6 text-left border-b border-gray-600">Name</th>
                            <th className="py-4 px-6 text-left border-b border-gray-600">Destination</th>
                            <th className="py-4 px-6 text-left border-b border-gray-600">Price</th>
                            <th className="py-4 px-6 text-left border-b border-gray-600">Action</th>
                        </tr>
                    </thead>
                    {/* Body */}
                    <tbody>
                        {packages.map((pkg, idx) => (
                            <tr key={pkg._id} className="hover:bg-gray-700 transition">
                                <td className="py-4 px-6 border-b border-gray-700">{idx + 1}</td>
                                <td className="py-4 px-6 border-b border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 flex-shrink-0">
                                            <img
                                                src={pkg?.image[0]?.imageUrl}
                                                alt="Package"
                                                className="h-full w-full rounded-md object-cover"
                                            />
                                        </div>
                                        <span className="font-semibold">{pkg.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 border-b border-gray-700">{pkg.destination}</td>
                                <td className="py-4 px-6 border-b border-gray-700">${pkg.price}</td>
                                <td className="py-4 px-6 border-b border-gray-700">
                                    <div className="flex gap-3">
                                        <Link to={`/dashboard/updatepackage/${pkg._id}`}>
                                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md shadow-md transition flex items-center gap-2">
                                                <FaEdit size={16} /> Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pkg._id)}
                                            className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md shadow-md transition flex items-center gap-2"
                                        >
                                            <FaTrashAlt size={16} /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
