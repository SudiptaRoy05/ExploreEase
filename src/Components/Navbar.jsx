import { FaHome, FaUsers, FaInfoCircle, FaSuitcase, FaUserCircle } from 'react-icons/fa';
import logo from '../../public/LOGO.png'
export default function Navbar() {
    return (
        <div className="navbar bg-gradient-to-r from-blue-500 to-green-400 text-white">
            <div className="navbar-start flex items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-black rounded-box mt-3 w-52 p-2 shadow-lg">
                        <li><a className="hover:bg-blue-100"><FaHome className="mr-2" />Home</a></li>
                        <li><a className="hover:bg-blue-100"><FaUsers className="mr-2" />Community</a></li>
                        <li><a className="hover:bg-blue-100"><FaInfoCircle className="mr-2" />About Us</a></li>
                        <li><a className="hover:bg-blue-100"><FaSuitcase className="mr-2" />Trips</a></li>
                        <li><a className="hover:bg-blue-100"><FaUserCircle className="mr-2" />Login/Register</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold tracking-wide flex items-center">
                    <img src={logo} alt="Logo" className="h-12 w-12 mr-2" />
                    ExploreEase
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a className="hover:text-gray-200"><FaHome className="mr-2" />Home</a></li>
                    <li><a className="hover:text-gray-200"><FaUsers className="mr-2" />Community</a></li>
                    <li><a className="hover:text-gray-200"><FaInfoCircle className="mr-2" />About Us</a></li>
                    <li><a className="hover:text-gray-200"><FaSuitcase className="mr-2" />Trips</a></li>
                    <li><a className="hover:text-gray-200"><FaUserCircle className="mr-2" />Login/Register</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <img
                            src="profile-pic.jpg"
                            alt="User Profile"
                            className="w-10 rounded-full"
                        />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-black rounded-box mt-3 w-52 p-2 shadow-lg">
                        <li className="p-2">
                            <span className="block text-sm font-bold">John Doe</span>
                            <span className="block text-xs text-gray-500">john.doe@example.com</span>
                        </li>
                        <li><a className="hover:bg-blue-100">Dashboard</a></li>
                        <li><a className="hover:bg-blue-100">Offer Announcements</a></li>
                        <li><a className="hover:bg-blue-100">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
