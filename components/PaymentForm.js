'use client'

import {TabPanel} from "@chakra-ui/react";
import {Elements} from "@stripe/react-stripe-js";
import DetailsTab from "./DetailsTab";
import PaymentDetailsTab from "./PaymentDetailsTab";
import SummaryTab from "./SummaryTab";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import {useEffect, useState} from "react";

export default function PaymentForm({clientSecret}) {
    console.log(clientSecret)
    const stripePromise = loadStripe('pk_test_51IVBB9AQCTwqaVCWlAxNV29U5OB4OSm0nswcaennsOKVXXGeQs7B6R8rhdV6lB9sQC4Zj2JvWQfz03sI2WA0wvC10028G1hQRF');


    const options = {
        clientSecret,
        appearance: {
            theme: 'flat',
            rules: {
                '.Input': {
                    borderRadius: '12px',
                    padding: '15px'
                }
            }
        }
    }

    console.log(options)


    async function handleSubmit(e) {
        e.preventDefault()
    }

    return <form onSubmit={handleSubmit}>
        <TabPanel>
            <DetailsTab stripePromise={stripePromise} options={options}/>
        </TabPanel>
        <TabPanel>
            <PaymentDetailsTab stripePromise={stripePromise} options={options}/>
        </TabPanel>
        <TabPanel>
            <SummaryTab/>
        </TabPanel>
    </form>
}
