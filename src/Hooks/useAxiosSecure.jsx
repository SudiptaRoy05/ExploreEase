import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://tourmanagement-puce.vercel.app',
});
// https://tourmanagement-puce.vercel.app
// https://tourmanagement-puce.vercel.app

export default function useAxiosSecure() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.authorization = `bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                //console.log("Status error:", status);

                if (status === 401 || status === 403) {
                    await logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logout, navigate]);

    return axiosSecure;
}
