import {Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    Spinner,
    TabPanel,
    TabPanels,
    Tabs, useMediaQuery,
    useSteps,
    useToast
} from "@chakra-ui/react";
import DetailsTab from "./DetailsTab";
import PaymentDetailsTab from "./PaymentDetailsTab";
import TransactionOverview from "./TransactionOverview";
import {useEffect, useState} from "react";
import {FaHouseChimney} from "react-icons/fa6";
import {FaArrowLeft} from "react-icons/fa";
import PaymentCompleteTab from "./PaymentCompleteTab";
import {useSearchParams} from "next/navigation";

const steps = [
    {title: 'Personal Details', description: 'Your personal details'},
    {title: 'Payment Details', description: 'Final Payment'}
]

export default function FormElements() {
    const params = useSearchParams()
    const stripe = useStripe()
    const elements = useElements()
    const toast = useToast()
    const [isLoading, setLoading] = useState(false)
    const [isPageLoading, setPageLoading] = useState(true)
    const [isPaymentComplete, setPaymentComplete] = useState(false)
    const [isPaymentSuccessful, setPaymentSuccessful] = useState(false)
    const [isMobile] = useMediaQuery("(max-width: 800px)")

    const clientSecret = params.get('payment_intent_client_secret')
    const redirectStatus = params.get('redirect_status')

    useEffect(() => {
        if (clientSecret) {
            const fetchpaymentIntent = async () => {
               const res =  await stripe?.retrievePaymentIntent(clientSecret)

                console.log(res)

                if (res) {
                    setPaymentComplete(true)
                    setPaymentSuccessful(res.paymentIntent.status === 'succeeded')
                }
            }
            fetchpaymentIntent()
        }
        setPageLoading(false)
    }, [redirectStatus, clientSecret, stripe])

    async function handleSubmit(e) {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)


        const {error} = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                return_url: "http://localhost:3000/",
            },
        })

        if (error) {
            setPaymentSuccessful(false)
            if (error.type === 'validation_error') {
                return toast({
                    title: error.message,
                    variant: 'subtle',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        } else {
            setPaymentSuccessful(true)
        }

        setPaymentComplete(true)
    }

    const {activeStep, setActiveStep, goToNext, goToPrevious} = useSteps({
        index: 0,
        count: steps.length,
    })


    function resetSteps() {
        setActiveStep(0)
        setPaymentSuccessful(false)
        setPaymentComplete(false)
    }

    return <>
        {isPageLoading ?
            <Center w={'100%'} h={'400px'}>
                <Spinner size={'xl'}/>
            </Center> : isPaymentComplete ?
                <PaymentCompleteTab resetSteps={resetSteps} isPaymentSuccessful={isPaymentSuccessful}/>
                : <Box w={'100%'}>
                    <form onSubmit={handleSubmit}>
                        <Flex gap={30} flexDirection={isMobile ? 'column' : 'row'}>
                            <Tabs isLazy={false} index={activeStep}>
                                <Flex gap={2} justifyContent={'space-between'}>
                                    <Flex>
                                        <IconButton aria-label={'Go back'} onClick={goToPrevious}
                                                    icon={activeStep === 0 ? <FaHouseChimney/> : <FaArrowLeft/>}/>
                                        <Heading ml={2}>
                                            LOGO
                                        </Heading>
                                    </Flex>
                                </Flex>
                                <Flex gap={50} justifyContent={'space-between'}>
                                    <TabPanels>
                                        <TabPanel>
                                            <DetailsTab/>
                                        </TabPanel>
                                        <TabPanel>
                                            <PaymentDetailsTab/>
                                        </TabPanel>
                                    </TabPanels>

                                </Flex>
                            </Tabs>
                            <Box display={'flex'} justifyContent={'center'}>
                                <TransactionOverview steps={steps} isLoading={isLoading} activeStep={activeStep}
                                                     goToNext={goToNext}/>
                            </Box>
                        </Flex>
                    </form>
                </Box>
        }
    </>
}
