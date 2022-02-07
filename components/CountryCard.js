import React, { memo } from 'react';
import { TouchableOpacity, View } from "react-native";
import { Text, HStack, VStack, Box, ArrowForwardIcon, Spacer } from "native-base";
import CountryFlag from "react-native-country-flag";
import { useNavigation } from '@react-navigation/native';

const CountryCard = (props) => {
    const navigation = useNavigation();
    return (
        <View>
            <Box borderBottomWidth="1" _dark={{ borderColor: "gray.600", bg: 'darkBlue.50' }} bg="DeepBlue" borderRadius="12" borderColor="coolGray.200" p="4" m="1">
                <TouchableOpacity onPress={() => navigation.navigate('Country', {
                    countryName: props.item.Country,
                    flag: props.item.CountryCode
                })}>
                    <HStack space={3} justifyContent="space-between">
                        <CountryFlag isoCode={props.item.CountryCode} size={25} style={{
                            borderRadius: 100, height: 40, width: 40
                        }} />
                        <VStack>
                            <Text _dark={{ color: "DeepBlue" }} color="white" bold>{props.item.Country}</Text>
                            <Text color="white" _dark={{ color: "DeepBlue" }}>Cases: {props.item.TotalConfirmed.toLocaleString()}</Text>
                        </VStack>
                        <Spacer />
                        <Box  _dark={{ borderColor: "gray.600", bg:"DeepBlue" }} bg="white" borderRadius="100" justifyContent="center" p="1" >
                            <ArrowForwardIcon size="md" mt="0.5" color="DeepBlue" _dark={{ color: "white", }} alignSelf="center" />
                        </Box>
                    </HStack>
                </TouchableOpacity>
            </Box>
        </View>
    );
};

export default memo(CountryCard);
