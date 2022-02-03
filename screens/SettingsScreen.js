import {Text,HStack,Box,Switch,useColorMode,MoonIcon,SunIcon,VStack} from "native-base";
import {SafeAreaView} from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";

const SettingsScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box
        flex={1}
        pt="3"
        _dark={{ bg: "DeepBlue" }}
        _light={{ bg: "white" }}
        px={4}
        flex={1}
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <HStack space={5} alignItems="center">
          <Text  style={{ fontWeight:'bold' }}>Set app theme</Text>
          <ToggleDarkMode />
        </HStack>
      </Box>
    </SafeAreaView>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center" marginLeft="auto">
       <MoonIcon size="5" mt="0.5" color="dark.500" />
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <SunIcon size="5" mt="0.5" color="yellow.500" />
    </HStack>
  );
}

export default SettingsScreen;