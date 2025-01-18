import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllTrips from "../Pages/AllTrips/AllTrips";
import Details from "../Pages/Details/Details";
import AddPackage from "../Pages/AddPackege/AddPackege";


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
                path: '/addpackage',
                element: <AddPackage></AddPackage>
            },
            {
                path: '/alltrips',
                element: <AllTrips></AllTrips>
            },
            {
                path: '/alltrips/details/:id',
                element: <Details></Details>
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
    }
])


export default router;