import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function TouristProfile() {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const updatedData = Object.fromEntries(form.entries());
        console.log('Updated Data:', updatedData);

        setModalOpen(false);

        Swal.fire({
            title: 'Profile Updated',
            text: 'Your profile has been successfully updated.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    const redirectToTourGuide = () => {
        navigate('/join-as-tour-guide');
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Welcome Message */}
            <h1 className="text-3xl font-bold text-center mb-6">
                Welcome, {user?.displayName || 'Guest'}!
            </h1>

            {/* User Information */}
            <div className="flex flex-col items-center space-y-6">
                {/* Profile Picture */}
                <img
                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                />

                {/* User Details */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{user?.displayName || 'Anonymous User'}</h2>
                    <p className="text-gray-600">{user?.email || 'No email provided'}</p>
                    <p className="text-blue-500 font-semibold">{user?.role || 'User'}</p>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => setModalOpen(true)}
                    >
                        Edit Profile
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={redirectToTourGuide}
                    >
                        Apply for Tour Guide
                    </button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block font-semibold mb-2">Name</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    defaultValue={user?.displayName || ''}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Profile Picture */}
                            <div>
                                <label className="block font-semibold mb-2">Profile Picture URL</label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    defaultValue={user?.photoURL || ''}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block font-semibold mb-2">Role</label>
                                <input
                                    type="text"
                                    value={user?.role || 'User'}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TouristProfile;
