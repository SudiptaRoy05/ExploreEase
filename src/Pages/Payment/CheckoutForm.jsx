import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function CheckoutForm({ selectedBooking, }) {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [errors, setError] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);

    const bookingAmount = Number(selectedBooking?.price || 0);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const res = await axiosSecure.post("/create-payment-intent", { price: bookingAmount });
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.error("Error creating payment intent:", err);
                Swal.fire("Error", "Failed to create payment intent. Please try again.", "error");
            }
        };
        if (bookingAmount > 0) {
            createPaymentIntent();
        }
    }, [axiosSecure, bookingAmount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            Swal.fire("Error", "Stripe is not loaded. Please try again later.", "error");
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            Swal.fire("Error", "Card details are missing. Please check and try again.", "error");
            return;
        }

        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            Swal.fire("Error", error.message, "error");
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName || "Anonymous",
                    },
                },
            }
        );

        if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            Swal.fire("Error", confirmError.message, "error");
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            setTransactionId(paymentIntent.id);

            // Save payment info to the database
            const paymentData = {
                transactionId: paymentIntent.id,
                email: user?.email,
                price: bookingAmount,
                bookingId: selectedBooking?._id,
                date: new Date(),
            };

            try {
                const res = await axiosSecure.post("/payment", paymentData);
                await axiosSecure.patch(`/mybooking/${selectedBooking?._id}`, {
                    status: "In Review",
                });
                console.log(res.data)
                Swal.fire({
                    icon: "success",
                    title: "Payment Successful!",
                    text: `Your transaction ID: ${paymentIntent.id}`,
                    timer: 3000,
                    timerProgressBar: true,
                });

            } catch (err) {
                console.error("Error saving payment info:", err);
                Swal.fire("Error", "Failed to save payment information.", "error");
            }

            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
            <p className="mb-2">
                Amount to pay: <strong>${bookingAmount}</strong>
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white shadow-md rounded-md p-4">
                    <CardElement
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#374151",
                                    "::placeholder": {
                                        color: "#9CA3AF",
                                    },
                                },
                                invalid: {
                                    color: "#DC2626",
                                },
                            },
                        }}
                    />
                </div>
                <button
                    className="btn btn-primary w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 disabled:opacity-50"
                    type="submit"
                    disabled={!stripe || !clientSecret || loading}
                >
                    {loading ? "Processing..." : "Pay"}
                </button>
                <p className="text-red-600">{errors}</p>
                {transactionId && (
                    <p className="text-green-600">Your transaction ID: {transactionId}</p>
                )}
            </form>
        </div>
    );
}
