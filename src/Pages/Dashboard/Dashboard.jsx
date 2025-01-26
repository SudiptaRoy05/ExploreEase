import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import useTourGuide from "../../Hooks/useTourGuid";
import useTourist from "../../Hooks/useTourist";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const email = user.email;

    const [isAdmin] = useAdmin();
    const [isTourGuide] = useTourGuide();
    const [isTourist] = useTourist();


    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col p-6 bg-gray-100 min-h-screen">
                <label
                    htmlFor="my-drawer-2"
                    className="lg:hidden absolute top-4 left-4 flex items-center justify-center w-10 h-10"
                >
                    <div className="space-y-1">
                        <span className="block w-8 h-1 bg-gray-800 rounded"></span>
                        <span className="block w-8 h-1 bg-gray-800 rounded"></span>
                        <span className="block w-8 h-1 bg-gray-800 rounded"></span>
                    </div>
                </label>

                {/* Page Content */}
                <div className="flex flex-col items-center justify-center flex-grow">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>

            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-gradient-to-r from-blue-600 to-green-400 text-white min-h-full w-80 p-6 shadow-lg space-y-4">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold">Dashboard Menu</h2>
                        <p className="text-sm text-gray-200">Quick access to features</p>
                    </div>
                    <li>
                        <NavLink to='/dashboard' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Profile
                        </NavLink>
                    </li>
                    {
                        isAdmin && (
                            <>
                                
                                <li>
                                    <NavLink to='/dashboard/addpackage' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                                        Add Packages
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allpackages' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                                        Manage Packages
                                    </NavLink>
                                </li>
                            </>
                        )
                    }

                    {
                        isTourGuide && (
                            <>
                                <li>
                                    <NavLink to='/dashboard/myassgiedtours' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                                        My assigned tours
                                    </NavLink>
                                </li>
                            </>
                        )
                    }

                    {
                        isTourist && (
                            <>
                                <li>
                                    <NavLink to='/dashboard/mybooking' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                                        My Booking
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to='/dashboard/tourguide' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                                        Join as Tour Guide
                                    </NavLink>
                                </li> */}

                            </>
                        )
                    }
                    <li>
                        <NavLink to='/dashboard/addstories' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Add Stories
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={`/dashboard/managestories/${email}`} className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Manage Stories
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Home
                        </NavLink>
                    </li>


                </ul>
            </div>
        </div>
    );
}
