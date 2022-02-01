import {
    Text,
    HStack,
    Center,
    Heading,
    Switch,
    useColorMode,
    VStack,
    Image,
} from "native-base";
import React from "react";
import CustomButton from "../components/CustomButton";
import NativeBaseIcon from "../components/NativeBaseIcon";

const HomeScreen = ({ navigation }) => {

    return (
        <Center h="100%" w="100%" _dark={{ bg: "DeepBlue" }} _light={{ bg: "white" }}>
            <VStack space={5} alignItems="center">
                {/* <Heading textAlign="center"> Home </Heading> */}
                <CustomButton onPress={() => navigation.navigate('Countries')} title="Countries" />
                <CustomButton onPress={() => navigation.navigate('About')} title="About app" />
                <CustomButton onPress={() => navigation.navigate('Settings')} title="Settings" />
            </VStack>
            <VStack mt="10" alignItems="center">
                <Image size="xl" source={require('../assets/img/covid.png')} alt="CovidTracker logo" />
            </VStack>
        </Center>
    );
}

export default HomeScreen;