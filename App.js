import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
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
  fontConfig: {
    Courier: {
      400: {
        normal: 'Courier New',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Courier',
    body: 'Courier',
    mono: 'Courier',
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
          <Stack.Screen name="Country"   options={({ route }) => ({ title: route.params.countryName })}component={CountryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


