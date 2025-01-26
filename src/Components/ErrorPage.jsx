import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-400 text-white">
            <motion.div
                className="text-center max-w-lg p-8 bg-white shadow-xl rounded-2xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <motion.h1
                    className="text-6xl font-bold text-blue-500 mb-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    404
                </motion.h1>
                <p className="text-gray-700 text-lg mb-6">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/">
                    <motion.button
                        className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Go Back Home
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}
