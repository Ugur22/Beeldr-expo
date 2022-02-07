import React from 'react';
import { HStack, Heading } from "native-base";

const CasesBlock = (props) => {
    return (
        <HStack alignItems="center" paddingBottom={2} paddingTop={2} >
            <Heading paddingBottom={2} size="sm" color="black" >{props.title}</Heading>
            <Heading paddingBottom={2} size="sm" color="black" > {props.value}</Heading>
        </HStack>
    );
};

export default CasesBlock;
