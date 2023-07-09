'use client'

import {
    Box, Center, Flex, Heading, IconButton,
    Step, StepIcon,
    StepIndicator, StepNumber,
    Stepper, StepSeparator,
    StepStatus, StepTitle,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, Text, useMediaQuery,
    useSteps
} from "@chakra-ui/react";
import {FaArrowLeft} from "react-icons/fa";
import {FaHouseChimney} from "react-icons/fa6";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";
import FormElements from "../../components/FormElements";
import {useSearchParams} from "next/navigation";

const stripePromise = loadStripe(process.env.STRIPE_CLIENT_KEY);

export default function Home() {
    const [clientSecret, setClientSecret] = useState()

    const [isMobile] = useMediaQuery("(max-width: 800px)")

    const params = useSearchParams()
    const paymentIntent = params.get('payment_intent')

    useEffect(() => {
        const fetchClientSecret = async () => {
            const data = await axios.get('/api/stripe').then(r => r.data)

            setClientSecret(data.client_secret)
        }
        fetchClientSecret()

        return () => {

        }
    }, [])


    const options = {
        clientSecret,
        appearance: {
            theme: 'flat',
            rules: {
                '.Input': {
                    borderRadius: '12px',
                    padding: '15px',
                    marginTop: '5px'
                },
                '.Label': {
                    opacity: 0.6
                }
            }
        }
    }


    return (
        <Center mt={100}>
            {clientSecret && <Flex justifyContent={'center'} borderRadius={15} w={isMobile ? '100%' : '60rem'} bg={'white'} p={4} justifyContent={'space-between'}>
                <Elements stripe={stripePromise} options={options} appearance={options.appearance}>
                    <FormElements/>
                </Elements>
            </Flex>}
        </Center>
    )
}
