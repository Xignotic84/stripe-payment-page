import {Box, useMediaQuery} from "@chakra-ui/react";
import {AddressElement, Elements, PaymentElement} from "@stripe/react-stripe-js";

export default function DetailsTab() {
    const [isMobile] = useMediaQuery("(max-width: 800px)")

    return <Box w={isMobile ? '100%' : '480px'}>
        <AddressElement options={{mode: 'billing', autocomplete: {mode: 'automatic'}, fields:{ phone: 'always'}}}/>
    </Box>
}
