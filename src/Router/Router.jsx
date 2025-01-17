import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllTrips from "../Pages/AllTrips/AllTrips";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<h3>404 error</h3>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/alltrips',
                element:<AllTrips></AllTrips>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },

        ]
    }
])


export default router;