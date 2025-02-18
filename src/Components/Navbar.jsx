import { motion } from 'framer-motion';
import { FaHome, FaUsers, FaInfoCircle, FaSuitcase, FaTachometerAlt } from 'react-icons/fa';
import logo from '../../public/LOGO.png';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then((result) => {
                //console.log(result);
            })
            .catch((error) => {
                //console.log(error);
            });
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-gray-200' : 'text-gray-800'
                    }
                >
                    <FaHome className="mr-2" />Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/community"
                    className={({ isActive }) =>
                        isActive ? 'text-gray-200' : 'text-gray-800'
                    }
                >
                    <FaUsers className="mr-2" />Community
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/aboutus"
                    className={({ isActive }) =>
                        isActive ? 'text-gray-200' : 'text-gray-800'
                    }
                >
                    <FaInfoCircle className="mr-2" />About Us
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/alltrips"
                    className={({ isActive }) =>
                        isActive ? 'text-gray-200' : 'text-gray-800'
                    }
                >
                    <FaSuitcase className="mr-2" />Trips
                </NavLink>
            </li>
        </>
    );

    return (
        <div className=' bg-gradient-to-r from-blue-500 to-green-400 text-white sticky top-0 z-50'>
            <div className="navbar w-10/12 mx-auto">
                <div className="navbar-start flex items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white text-black rounded-box mt-3 w-52 p-2 shadow-lg z-50"
                        >
                            {links}
                        </ul>
                    </div>
                    <Link to='/'>
                        <motion.a
                            className=" text-xl font-bold tracking-wide flex items-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={logo} alt="Logo" className="h-12 w-12 mr-2" />
                            <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 15,
                                    duration: 0.5,
                                }}
                            >
                                ExploreEase
                            </motion.span>
                        </motion.a>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <img
                                    src={user?.photoURL || '/default-profile.png'}
                                    alt="User Profile"
                                    className="w-10 rounded-full"
                                />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white text-black rounded-box mt-3 w-52 p-2 shadow-lg z-50"
                            >
                                <li className="p-2">
                                    <span className="block text-sm font-bold">{user.displayName}</span>
                                    <span className="block text-xs text-gray-500">{user.email}</span>
                                </li>
                                <li>
                                    <Link to='/dashboard'>
                                        <FaTachometerAlt className="mr-2" />Dashboard
                                    </Link>
                                </li>

                                <button onClick={handleLogout} className="hover:bg-blue-100 btn btn-sm btn-warning text-white">
                                    Logout
                                </button>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <NavLink to="/login" className="btn">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="btn">
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
