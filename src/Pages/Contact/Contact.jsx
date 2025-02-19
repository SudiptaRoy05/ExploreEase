import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import emailjs from "@emailjs/browser";

function Contact() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setName(user?.displayName || "");
        setEmail(user?.email || "");
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);

        emailjs.send(
            "service_czajhzf",
            "template_n4whx4b",
            {
                from_name: name,
                from_email: email,
                message: message,
            },
            "2jmcpUPs05wAE61tN"
        ).then(
            () => {
                setSuccessMessage("Your message has been sent successfully!");
                setErrorMessage("");
                setMessage("");
                setSending(false);
            },
            () => {
                setErrorMessage("Failed to send your message. Please try again later.");
                setSuccessMessage("");
                setSending(false);
            }
        );
    };

    return (
        <div className=" flex justify-evenly items-start gap-6 w-10/12 mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg md:p-10 ">
            <div>
                {/* Title and Subtitle */}
                <h2 className="text-4xl font-bold text-center mb-6">
                    Need to contact us? Use one of the options below. Our team is always happy to help.
                </h2>
                <h3 className="text-3xl font-bold text-center mb-6">
                    Email us
                </h3>
                <p className="text-center text-gray-600 mb-8">
                    Drop us an email and we’ll get back to you within 48hrs…
                </p>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                            value={name}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                            value={email}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message:</label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
                        disabled={sending}
                    >
                        {sending ? 'Sending...' : 'Send Message'}
                    </button>
                </form>

                {/* Success/Error Messages */}
                {successMessage && <p className="mt-6 text-green-600 text-center">{successMessage}</p>}
                {errorMessage && <p className="mt-6 text-red-600 text-center">{errorMessage}</p>}

            </div>

            <div>
                {/* Contact Info Flexbox Layout */}
                <div className="flex justify-end gap-6 mb-8">
                    {/* Trip Queries Card */}
                    <div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-lg max-w-[48%]">
                        <h4 className="text-xl font-semibold text-blue-600 mb-4">Trip Queries</h4>
                        <p className="text-gray-700 mb-4">
                            Need information about a trip? We're here to help with any details.
                        </p>
                        <p><strong>Email:</strong> ballavesudipta@gmail.com</p>
                    </div>

                    {/* Emergency Helpline Card */}
                    <div className="flex-1 bg-red-50 p-6 rounded-lg shadow-lg max-w-[48%]">
                        <h4 className="text-xl font-semibold text-red-600 mb-4">Emergency Helpline</h4>
                        <p className="text-gray-700 mb-4">
                            For immediate assistance, please call our helpline.
                        </p>
                        <p><strong>Phone:</strong> 01580311924</p>
                        <p><strong>Hours:</strong> Mon-Sun: 24 Hours</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Contact;
