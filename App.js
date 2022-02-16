import React from "react";
import { NativeBaseProvider, extendTheme,Heading } from "native-base";
import { Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import CountriesScreen from "./screens/CountriesScreen";
import AboutScreen from "./screens/AboutScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CountryScreen from "./screens/CountryScreen";
import { useFonts } from 'expo-font';

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
    customfont: {
        normal: Platform.OS === 'android' ? 'Roboto' : 'PlayfairDisplay',
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: Platform.OS === 'android' ? 'Roboto' : 'PlayfairDisplay-Bold',
    body: Platform.OS === 'android' ? 'Roboto' : 'PlayfairDisplay',
    mono: Platform.OS === 'android' ? 'Roboto' : 'PlayfairDisplay',
  },
});

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    PlayfairDisplay: require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Bold': {
      uri: require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
    },
  });
  
  
  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CovidTracker" options={() => ({ headerTitleStyle: {fontFamily: 'PlayfairDisplay-Bold',} })}  component={HomeScreen} />
          <Stack.Screen name="Countries" options={() => ({ headerTitleStyle: {fontFamily: 'PlayfairDisplay-Bold',} })} component={CountriesScreen} />
          <Stack.Screen name="About" options={() => ({ headerTitleStyle: {fontFamily: 'PlayfairDisplay-Bold',} })} component={AboutScreen} />
          <Stack.Screen name="Settings" options={() => ({ headerTitleStyle: {fontFamily: 'PlayfairDisplay-Bold',} })} component={SettingsScreen} />
          <Stack.Screen name="Country" options={({route}) => ({title: route.params.countryName, headerTitleStyle: { fontFamily: 'PlayfairDisplay-Bold'}})} component={CountryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

