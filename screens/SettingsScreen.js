import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  VStack,
} from "native-base";
import React from "react";
import CustomButton from "../components/CustomButton";

const SettingsScreen = () => {

  return (
    <Center h="100%" w="100%"
      _dark={{ bg: "darkBlue.900" }}
      _light={{ bg: "#FFF" }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Text>Settings</Text>
      </VStack>
    </Center>
  );
}

export default SettingsScreen;