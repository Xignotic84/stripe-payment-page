import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    List,
    ListItem,
    Step, StepIcon,
    StepIndicator, StepNumber, Stepper, StepSeparator,
    StepStatus, StepTitle,
    Text
} from "@chakra-ui/react";
import ProductItem from "./ProductItem";
import {useElements} from "@stripe/react-stripe-js";

const items = [
    {
        title: 'Analytics',
        description: 'Gain access to detailed analytics about your services and users.'
    },
    {
        title: 'Beta Access',
        description: 'Receive early access to features and news regarding the development of this project.'
    },
    {
        title: 'Support and Coverage',
        description: 'With this plan, you will receive 24/7 support and coverage for your services.'
    }
]


export default function TransactionOverview({steps, isLoading, activeStep, goToNext}) {
    const isFinalStep = activeStep === 1

    const elements = useElements()

    return <Box w={'350px'} bg={'white.400'} borderRadius={15}>
        <Stepper ml={2} w={'93%'} colorScheme={'blue'} mt={3} mb={3} size='sm' index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon/>}
                            incomplete={<StepNumber/>}
                            active={<StepNumber/>}
                        />
                    </StepIndicator>
                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                    </Box>
                    <StepSeparator/>
                </Step>
            ))}
        </Stepper>
        <Box borderRadius={15} bg={'whiteAlpha.400'}
             background={'linear-gradient(to top, #F2F2F4, #E9E5F6, #F5EEE3)'}>
            <Box opacity={1} color={'black'} p={5}>
                <Text>
                    Purchase summary
                </Text>
                <Flex>
                    <Heading>
                        $450
                    </Heading>
                    <Heading display={'flex'} mb={1.5} alignItems={'flex-end'} size={'md'} opacity={0.5}>
                        .99
                    </Heading>
                </Flex>
                <List mt={2} spacing={3}>
                    {items.map((item, i) => {
                        return <ProductItem key={i} title={item.title} description={item.description}/>
                    })}
                </List>
                <Center mt={3}>
                    <Button onClick={async () => {
                                if (!isFinalStep) {
                                    const validateElements = await elements.getElement('address').getValue()
                                    setTimeout(() => {
                                        if (validateElements.complete)
                                            goToNext()
                                    }, 50)
                                }
                            }}
                            isLoading={isLoading} type={isFinalStep ? 'submit' : 'button'}
                            bg={isFinalStep ? 'green.500' : 'black'} _hover={{background: "green.400"}}
                            borderRadius={15} w={'100%'} color={'white'}>
                        {isFinalStep ? 'Pay' : 'Continue'}
                    </Button>
                </Center>
            </Box>
        </Box>
    </Box>
}
