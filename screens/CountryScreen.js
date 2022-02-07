import { VStack, HStack, Box, Heading, Spinner } from "native-base";
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Dimensions, StyleSheet, ScrollView, LogBox, PixelRatio } from "react-native";
import CountryFlag from "react-native-country-flag";
import LineChart from "../components/charts/LineChart";
import GroupBarChart from "../components/charts/GroupBarChart";
import CasesBlock from "../components/CasesBlock";

const CountryScreen = ({ route }) => {

  LogBox.ignoreLogs([' Failed prop type: undefined is not an object']);

  let [dataCountries, setCountry] = useState([]);
  let country = route.params.countryName;
  let flag = route.params.flag;
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    }
  });

  useEffect(() => {
    fetchData();

  }, [])


  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.covid19api.com/total/country/${country}`)
      .then(response => response.json())
      .then((res) => {
        setCountry(res)
        setLoading(false);
      });
  }

  // Get latest value of all types of cases
  let latest_confirmed = Math.max(...dataCountries.map((a) => a.Confirmed));
  let latest_active = Math.max(...dataCountries.map((a) => a.Active));
  let latest_recovered = Math.max(...dataCountries.map((a) => a.Recovered));
  let latest_deaths = Math.max(...dataCountries.map((a) => a.Deaths));

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const getDataBarChart = (datatype, sliceStart, sliceEnd) => {
    let dataBarChart = dataCountries.map(function (country) {
      return {
        y: country[datatype],
        x: country.Date
      };
    });
    return dataBarChart.slice(sliceStart, sliceEnd);
  }

  return (
    <SafeAreaView flex={1}>
      {!loading && (
        <Box flex={1} pt="0" _dark={{ bg: "DeepBlue" }} _light={{ bg: "DeepBlue" }} w={{ base: "100%" }} >
          <VStack space={0} alignItems="center">
            <HStack space={2} alignItems="center" paddingTop={2} paddingBottom={2} >
              <CountryFlag isoCode={flag} size={10} style={{ borderRadius: 100, marginTop: 20, height: 50, width: 50 }} />
            </HStack>
            <Heading size="md" color="white">Total cases: {latest_confirmed.toLocaleString()}</Heading>
            <LineChart data={getDataBarChart('Confirmed').filter(item => (item.y !== 0))} />
          </VStack>
          <Box flex={1} style={{ top: 52 }} paddingX={4} _dark={{ bg: "white" }} _light={{ bg: "white" }} >
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ top: -20 }} >
              <GroupBarChart deaths={getDataBarChart('Deaths', 100, 105)} active={getDataBarChart('Active', 100, 105)}
                recovered={getDataBarChart('Recovered', 100, 105)} />
              <Box paddingTop={8}>
                <CasesBlock title="Active cases:" value={latest_active.toLocaleString()} />
                <CasesBlock title="Recovered cases:" value={latest_recovered.toLocaleString()} />
                <CasesBlock title="Death cases:" value={latest_deaths.toLocaleString()} />
              </Box>
            </ScrollView>
          </Box>
        </Box>
      )}
      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <HStack space={8} justifyContent="center" alignItems="center">
            <Spinner size="lg" />
          </HStack>
        </View>
      )}
    </SafeAreaView>
  );
}

export default CountryScreen;