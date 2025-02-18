import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start as loading
    const googleAuthProvider = new GoogleAuthProvider();

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } finally {
            setLoading(false);
        }
    };


    const forgotPass = async (email) => {
        setLoading(true); // Start loading before the operation
        try {
            return await sendPasswordResetEmail(auth, email);
        } finally {
            setLoading(false); // Stop loading after the operation completes
        }
    };


    const updateUserProfile = async (name, image) => {
        setLoading(true);
        try {
            return await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: image,
            });
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleAuthProvider);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                try {
                    const res = await axios.post("https://tourmanagement-puce.vercel.app/jwt", userInfo);
                    //console.log(res.data.token);
                    if (res.data.token) {
                        localStorage.setItem("access-token", res.data.token);
                    }
                } catch (error) {
                    console.error("Error fetching token:", error);
                }
            } else {
                localStorage.removeItem("access-token");
            }
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        forgotPass,
        login,
        logout,
        googleLogin,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}
