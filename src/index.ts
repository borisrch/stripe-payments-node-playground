import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import * as dotenv from 'dotenv'

const app = express()
dotenv.config()

// Connect JSON middleware
app.use(express.json())
// Set up CORS
app.use(cors())
app.options(`*`, cors())

const port = process.env.PORT || 3000

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(`Stripe Secret Key is missing from .env`)
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: `2022-11-15`
})

app.post(`/create-setup-intent`, async (req, res) => {
    try {
        const data = req.body

        if (!data.email) {
            throw new Error(`Missing required parameter: email`)
        }

        const customer = await stripe.customers.create({
            email: data.email
        })

        const setupIntent = await stripe.setupIntents.create({
            customer: customer.id
        })

        res.status(201)
            .send({
                id: ``,
                client_secret: setupIntent.client_secret,
                email: data.email
            })
    } catch (exception) {
        if (exception instanceof SyntaxError) {
            res.status(400)
                .json({ error: `Missing required parameter: email` })
        } else {
            res.status(500)
                .json({ error: exception })
        }
    }
})

/**
 * This needs to be a public endpoint that returns the payment method associated with the SetupIntent
 */
app.get(`/retrieve-setup-intent/:id`, async (req, res) => {
    try {
        const clientSecret = req.params.clientSecret

        if (!clientSecret) {
            throw new Error(`Missing required parameter: client_secret`)
        }

        console.log(clientSecret)

        const setupIntent = await stripe.setupIntents.retrieve(clientSecret)

        res.status(200)
            .send(setupIntent)
    } catch (exception) {
        if (exception instanceof SyntaxError) {
            res.status(400)
                .json({ error: `Missing required parameter: email` })
        } else {
            res.status(500)
                .json({ error: exception })
        }
    }
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
