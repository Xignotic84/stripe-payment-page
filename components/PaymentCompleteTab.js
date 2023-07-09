import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button} from "@chakra-ui/react";
import {useRouter} from "next/navigation";

export default function PaymentCompleteTab({resetSteps, isPaymentSuccessful}) {
    const router = useRouter()
    return (
        <Box w={'100%'}>
            <Alert
                status={isPaymentSuccessful ? 'success' : 'error'}
                borderRadius={15}
                variant='subtle'
                w={'100%'}
                p={5}
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Payment {isPaymentSuccessful ? 'Successful' : 'Failed'}
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    Your payment has {isPaymentSuccessful ? 'been successfully processed' : 'failed to be processed, please try again'}.
                </AlertDescription>
                <Button mt={3} bg={'white'} borderRadius={15} onClick={() => {
                    router.push('/')
                    resetSteps()
                }}>
                    Return Home
                </Button>
            </Alert>
        </Box>

    )
}
