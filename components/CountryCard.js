import React, { memo } from 'react';
import { TouchableOpacity, View } from "react-native";
import { Text, HStack, VStack, Box, ArrowForwardIcon, Spacer } from "native-base";
import CountryFlag from "react-native-country-flag";
import { useNavigation } from '@react-navigation/native';

const CountryCard = (props) => {
    const navigation = useNavigation();
    return (
        <View>
            <Box borderBottomWidth="1" _dark={{ borderColor: "gray.600" }} borderColor="coolGray.200" pl="2" pr="2" py="2">
                <TouchableOpacity onPress={() => navigation.navigate('Country', {
                    countryName: props.item.Country,
                    flag: props.item.CountryCode
                })}>
                    <HStack space={3} justifyContent="space-between">
                        <CountryFlag isoCode={props.item.CountryCode} size={25} style={{
                            borderRadius: 100, height: 40, width: 40
                        }} />
                        <VStack>
                            <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                {props.item.Country}
                            </Text>
                            <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>Total Confirmed: {props.item.TotalConfirmed.toLocaleString()}
                            </Text>
                        </VStack>
                        <Spacer />
                        <ArrowForwardIcon size="sm" mt="0.5" color="DeepBlue" _dark={{ color: "white", }} alignSelf="center" />
                    </HStack>
                </TouchableOpacity>
            </Box>
        </View>
    );
};

export default memo(CountryCard);
