import { Box, VStack, Image,Heading } from "native-base";
import React from "react";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native";

const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Box pt={5} flex={1} _dark={{ bg: "DeepBlue" }} _light={{ bg: "white" }}>
                <VStack space={5} alignItems="center">
                    <Heading textAlign="center" paddingY={2}> Welcome to the CovidTracker </Heading>
                    <CustomButton onPress={() => navigation.navigate('Countries')} title="Countries" />
                    <CustomButton onPress={() => navigation.navigate('About')} title="About app" />
                    <CustomButton onPress={() => navigation.navigate('Settings')} title="Settings" />
                </VStack>
                <VStack mt="10" alignItems="center">
                    <Image size="250" source={require('../assets/img/covid.png')} alt="CovidTracker logo" />
                </VStack>
            </Box>
        </SafeAreaView>
    );
}

export default HomeScreen;