import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col p-6 bg-gray-100 min-h-screen">
                {/* Hamburger Menu (Top-Left Corner, Mobile Only) */}
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
                    <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
                    <p className="text-gray-600 text-center mt-4 mb-6">
                        Manage your activities, view insights, and customize your experience.
                    </p>
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
                        <NavLink to='/dashboard/addstories' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Add Stories
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/dashboard/addpackage' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Add Packages
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/managepackage' className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Manage Packages
                        </NavLink>
                    </li>
                    
                    <li>
                        <a className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Settings
                        </a>
                    </li>
                    <li>
                        <a className="hover:bg-blue-500 hover:text-white p-3 rounded-md transition-all">
                            Support
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
