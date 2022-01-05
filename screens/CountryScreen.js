import {
  Text,
  VStack,
  Box,
} from "native-base";
import React, { useState, useEffect } from 'react';
import CountryFlag from "react-native-country-flag";

const CountryScreen = ({route, navigation}) => {

  let [dataCountries, setCountry] = useState([]);
  let country = route.params.countryName;
  let flag = route.params.flag;

  useEffect(() => {
    fetchData();
 
  }, [])


  const fetchData = () => {
    fetch(`https://api.covid19api.com/total/country/${country}`)
      .then(response => response.json())
      .then(json => setCountry(json))
  }


  const amount_confirmed = dataCountries.map((a) => a.Confirmed);
  let latest_confirmed = Math.max(...amount_confirmed);
  console.log(latest_confirmed);


  return (
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
  );
}

export default CountryScreen;