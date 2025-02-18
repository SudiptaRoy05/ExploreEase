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
import AddStories from "../Pages/Community/AddStories";
import Stories from "../Pages/Community/Stories";
import StoryDetails from "../Pages/Community/StoryDetails";
import ManageStories from "../Pages/Community/ManageStories";
import UpdateStories from "../Pages/Community/UpdateStories";
import TourGuide from "../Pages/Dashboard/TourGuide/TourGuide";
import AboutUs from "../Pages/AboutUs/AboutUs";
import TouristProfile from "../Pages/Dashboard/Profile/TouristProfile";
import GuideDetails from "../Pages/GuideDetails/GuideDetails";
import Profile from "../Pages/Dashboard/Profile/Profile";
import MyBooking from "../Pages/Dashboard/MyBooking/MyBooking";
import MyAssignedTours from "../Pages/Dashboard/TourGuide/MyAssignedTours";
import AdminRoute from "./AdminRoute";
import GuideRoute from "./GuideRoute";
import ErrorPage from "../Components/ErrorPage";
// import Payment from "../Pages/Payment/Payment";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
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
                loader: async ({ params }) => fetch(`https://tourmanagement-puce.vercel.app/details/${params.id}`)
            },
            {
                path: '/community',
                element: <Stories></Stories>
            },
            {
                path: '/community/details/:id',
                element: <StoryDetails></StoryDetails>,
                loader: async ({ params }) => fetch(`https://tourmanagement-puce.vercel.app/story/details/${params.id}`)
            },
            {
                path: '/guide/:id',
                element: <GuideDetails></GuideDetails>,
                loader: async ({ params }) => fetch(`https://tourmanagement-puce.vercel.app/guidedetails/${params.id}`)
            },
            {
                path: '/aboutus',
                element: <AboutUs></AboutUs>
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
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <Profile></Profile>
            },
            {
                path: '/dashboard/addstories',
                element: <AddStories></AddStories>
            },
            // {
            //     path:'/dashboard/patment',
            //     element:<Payment></Payment>
            // },
            {
                path: '/dashboard/updatestories/:id',
                element: <UpdateStories></UpdateStories>,
                loader: async ({ params }) => fetch(`https://tourmanagement-puce.vercel.app/story/details/${params.id}`)
            },
            {
                path: '/dashboard/myassgiedtours',
                element: <GuideRoute>
                    <MyAssignedTours></MyAssignedTours>
                </GuideRoute>,
            },
            {
                path: '/dashboard/managestories/:email',
                element: <ManageStories></ManageStories>,
            },
            {
                path: '/dashboard/mybooking',
                element: <MyBooking></MyBooking>
            },
            {
                path: '/dashboard/addpackage',
                element: <AdminRoute>
                    <AddPackage></AddPackage>
                </AdminRoute>,
            },
            {
                path: '/dashboard/allpackages',
                element: <AdminRoute>
                    <ManagePackage></ManagePackage>
                </AdminRoute>
            },
            {
                path: '/dashboard/updatepackage/:id',
                element: <AdminRoute>
                    <UpdatePackage></UpdatePackage>
                </AdminRoute>,
                loader: async ({ params }) => fetch(`https://tourmanagement-puce.vercel.app/updatepackage/${params.id}`)
            },
            {
                path: '/dashboard/tourguide',
                element: <TourGuide></TourGuide>,

            },
        ]
    }
])


export default router;