export default function MyAssignedTours() {
    return (
        <div className="assigned-tours-page p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                My Assigned Tours
            </h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
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
                        {/* Sample Row 1 */}
                        <tr className="hover:bg-gray-100 transition duration-200">
                            <td className="py-4 px-6 text-gray-800 text-lg">
                                Beautiful Beaches Tour
                            </td>
                            <td className="py-4 px-6 text-gray-800 text-lg">John Doe</td>
                            <td className="py-4 px-6 text-gray-800 text-lg">2025-02-25</td>
                            <td className="py-4 px-6 text-gray-800 text-lg">$150</td>
                            <td className="py-4 px-6 text-blue-500 text-lg font-semibold">
                                In Review
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex items-center space-x-4">
                                    <button className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                                        Accept
                                    </button>
                                    <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>

                        {/* Sample Row 2 */}
                        <tr className="hover:bg-gray-100 transition duration-200">
                            <td className="py-4 px-6 text-gray-800 text-lg">
                                Mountain Adventure
                            </td>
                            <td className="py-4 px-6 text-gray-800 text-lg">Jane Smith</td>
                            <td className="py-4 px-6 text-gray-800 text-lg">2025-03-10</td>
                            <td className="py-4 px-6 text-gray-800 text-lg">$200</td>
                            <td className="py-4 px-6 text-yellow-500 text-lg font-semibold">
                                Pending
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="py-2 px-4 bg-gray-300 text-white rounded-md cursor-not-allowed"
                                        disabled
                                    >
                                        Accept
                                    </button>
                                    <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Are you sure you want to reject this tour?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Tour Package: <strong>Beautiful Beaches Tour</strong>
                    </p>
                    <div className="flex justify-end space-x-4">
                        <button className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300">
                            Cancel
                        </button>
                        <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
