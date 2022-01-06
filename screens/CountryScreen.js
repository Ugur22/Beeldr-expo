import {
  Text,
  VStack,
  Box,
} from "native-base";
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image } from "react-native";
import CountryFlag from "react-native-country-flag";

const CountryScreen = ({ route, navigation }) => {

  let [dataCountries, setCountry] = useState([]);
  let country = route.params.countryName;
  let flag = route.params.flag;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

  }, [])


  const fetchData = () => {
    fetch(`https://api.covid19api.com/total/country/${country}`)
      .then(response => response.json())
      .then(json => setCountry(json))
    setLoading(false);
  }


  const amount_confirmed = dataCountries.map((a) => a.Confirmed);
  let latest_confirmed = Math.max(...amount_confirmed);
  console.log(latest_confirmed);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading && (
        <Box
          flex={1}
          pt="3"
          _dark={{ bg: "darkBlue.900" }}
          _light={{ bg: "#FFF" }}
          px={4}
          flex={1}
          w={{
            base: "100%",
            md: "25%",
          }}
        >      <VStack space={5} alignItems="center">
            <Text>{country}</Text>
            <Text>{latest_confirmed}</Text>
            <CountryFlag isoCode={flag} size={10} style={{
              borderRadius: 100, height: 80, width: 80
            }} />
          </VStack>

        </Box>
      )}
      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={{
              uri:
                'https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif',
            }}
            style={{ height: 80, width: 60 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default CountryScreen;