import { Box, VStack, Heading } from "native-base";
import React from "react";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native";
import CovidSocial from '../assets/img/covid-social.svg';

const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Box pt={5} flex={1} _dark={{ bg: "DeepBlue" }} _light={{ bg: "white" }}>
                <VStack space={5} alignItems="center">
                    <Heading textAlign="center" _dark={{ color: "white" }} _light={{ color: "DeepBlue" }}paddingY={2}> Welcome to the CovidTracker </Heading>
                    <CustomButton onPress={() => navigation.navigate('Countries')} title="Countries" iconName="bar-chart-outline" />
                    <CustomButton onPress={() => navigation.navigate('About')} title="About app" iconName="information-outline" />
                    <CustomButton onPress={() => navigation.navigate('Settings')} title="Settings" iconName="settings-outline" />
                </VStack>
                <VStack mt="20" alignItems="center">
                    <CovidSocial height={300} width={300} />
                </VStack>
            </Box>
        </SafeAreaView>
    );
}

export default HomeScreen;