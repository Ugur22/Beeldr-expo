import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import CountriesScreen from "./screens/CountriesScreen";
import AboutScreen from "./screens/AboutScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CountryScreen from "./screens/CountryScreen";

const theme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "dark",
  colors: {
    // Redefinig only one shade, rest of the color will remain same.
    covidRed: '#FF4757',
    covidOrange: '#EE5A24',
    covidGreen: '#7BED9F',
    DeepBlue: '#4B4F72',
  },
  fontConfig: {
    Courier: {
      400: {
        normal: Platform.OS === 'android' ? 'Roboto' : 'Courier New',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: Platform.OS === 'android' ? 'Roboto' : 'Courier',
    body: Platform.OS === 'android' ? 'Roboto' : 'Courier',
    mono: Platform.OS === 'android' ? 'Roboto' : 'Courier',
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CovidTracker" component={HomeScreen} />
          <Stack.Screen name="Countries" component={CountriesScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Country" options={({ route }) => ({ title: route.params.countryName })} component={CountryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


