
import stripe from 'stripe'
import {NextResponse} from "next/server";

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(request) {

    let paymentIntent

    try {
        paymentIntent = await stripeClient.paymentIntents.create({
            amount: 42099,
            currency: 'eur',
            payment_method_types: ['card', 'ideal'],
            receipt_email: 'contact@xignotic.dev',
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json({code: err.statusCode, message: "Something went wrong creating payment."}, {
            status: err.statusCode
        })
    }

   return NextResponse.json({ client_secret: paymentIntent.client_secret })
}

export async function POST(request) {

}
