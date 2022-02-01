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

const AboutScreen = () => {

  return (
    <Center h="100%" w="100%"
      _dark={{ bg: "DeepBlue" }}
      _light={{ bg: "white" }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Text>About App</Text>
      </VStack>
    </Center>
  );
}

export default AboutScreen;