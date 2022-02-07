import React from 'react';
import { HStack, Heading } from "native-base";

const CasesBlock = (props) => {
    return (
        <HStack alignItems="center" paddingBottom={2} paddingTop={2} >
            <Heading color={props.textColor ? props.textColor : 'black'} paddingBottom={2} size="sm">{props.title}</Heading>
            <Heading paddingBottom={2} size="sm" color={props.textColor ? props.textColor : 'black'} > {props.value}</Heading>
        </HStack>
    );
};

export default CasesBlock;
