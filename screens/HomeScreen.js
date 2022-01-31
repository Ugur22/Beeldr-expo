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
        <Center h="100%" w="100%" _dark={{ bg: "darkBlue.900" }} _light={{ bg: "#FFF" }}>
            <VStack space={5} alignItems="center">
                <Heading textAlign="center"> Home </Heading>
                <CustomButton onPress={() => navigation.navigate('Countries')} title="Countries" />
                <CustomButton onPress={() => navigation.navigate('About')} title="About app" />
                <CustomButton onPress={() => navigation.navigate('Settings')} title="Settings" />
                {/* <ToggleDarkMode /> */}
            </VStack>
            <VStack mt="10" alignItems="center">
                <Image size="xl" source={require('../assets/img/covid.png')} alt="CovidTracker logo" />
            </VStack>
        </Center>
    );
}

// Color Switch Component
function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === "light" ? true : false}
                onToggle={toggleColorMode}
                aria-label={
                    colorMode === "light" ? "switch to dark mode" : "switch to light mode"
                }
            />
            <Text>Light</Text>
        </HStack>
    );
}

export default HomeScreen;