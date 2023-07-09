import {Flex, Heading, ListIcon, ListItem, Text} from "@chakra-ui/react";
import {FaCircleCheck} from "react-icons/fa6";

export default function ProductItem({title, description}) {
    return <ListItem>
        <Heading size={'sm'}>
            <ListIcon as={FaCircleCheck} boxSize={5} color='green.400' />
            {title}
        </Heading>
        <Text mt={2} opacity={0.7}>
            {description}
        </Text>
    </ListItem>
}
