import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllTrips from "../Pages/AllTrips/AllTrips";
import Details from "../Pages/Details/Details";
import AddPackage from "../Pages/Dashboard/AddPackege/AddPackege";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManagePackage from "../Pages/Dashboard/ManagePackage/ManagePackage";
import UpdatePackage from "../Pages/Dashboard/ManagePackage/UpdatePackage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <h3>404 error</h3>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path: '/alltrips',
                element: <AllTrips></AllTrips>
            },
            {
                path: '/details/:id',
                element: <Details></Details>,
                loader: async ({ params }) => fetch(`http://localhost:5000/details/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        errorElement: <h3>404 error</h3>,
        children: [
            {
                path: '/dashboard/addpackage',
                element: <AddPackage></AddPackage>
            },
            {
                path: '/dashboard/managepackage',
                element: <ManagePackage></ManagePackage>
            },
            {
                path: '/dashboard/updatepackage/:id',
                element: <UpdatePackage></UpdatePackage>,
                loader: async ({ params }) => fetch(`http://localhost:5000/details/${params.id}`)
            },
        ]
    }
])


export default router;