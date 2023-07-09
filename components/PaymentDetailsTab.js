import {Box, useMediaQuery} from "@chakra-ui/react";
import {Elements, PaymentElement} from '@stripe/react-stripe-js';

export default function PaymentDetailsTab() {
    const [isMobile] = useMediaQuery("(max-width: 800px)")

    const elementOptions = {
        paymentMethodOrder: ['card', 'ideal'],
        layout: {
            type: 'tabs',
        }
    }

    return <Box w={isMobile ? '100%' : '480px'}>
        <PaymentElement options={elementOptions}/>
    </Box>
}
