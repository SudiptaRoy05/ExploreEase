import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
export default function Payment({ selectedBooking }) {
    return (
        <div>
            <h2>Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm selectedBooking={selectedBooking}></CheckoutForm>
                </Elements>
            </div>
        </div>
    )
}
