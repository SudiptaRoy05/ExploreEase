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
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    {/* Head */}
                    <thead className="bg-gradient-to-r from-blue-600 to-green-400 text-white">
                        <tr>
                            <th className="py-4 px-6 text-left">#</th>
                            <th className="py-4 px-6 text-left">Name</th>
                            <th className="py-4 px-6 text-left">Destination</th>
                            <th className="py-4 px-6 text-left">Price</th>
                            <th className="py-4 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    {/* Body */}
                    <tbody className="text-gray-700">
                        {packages.map((pkg, idx) => (
                            <tr key={pkg._id} className="hover:bg-gray-100 transition-colors">
                                <td className="py-4 px-6 border-b border-gray-200">{idx + 1}</td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={pkg?.image[0]?.imageUrl}
                                                    alt="Package"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{pkg.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200">{pkg.destination}</td>
                                <td className="py-4 px-6 border-b border-gray-200">${pkg.price}</td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <div className="flex gap-4">
                                        <Link to={`/dashboard/updatepackage/${pkg._id}`}>
                                            <button className="btn btn-sm"><FaEdit className="text-green-500 cursor-pointer" size={20} /></button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pkg._id)}
                                            className="btn btn-sm"><FaTrashAlt className="text-red-500 cursor-pointer" size={20} /></button>
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
