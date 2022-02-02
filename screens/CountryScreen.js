import {
  Text,
  VStack,
  HStack,
  Box,
  Heading,
  Spinner
} from "native-base";
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Dimensions, StyleSheet,LogBox } from "react-native";
import CountryFlag from "react-native-country-flag";
import { VictoryStack, VictoryBar, VictoryChart, VictoryGroup, VictoryAxis, VictoryLabel, VictoryZoomContainer, VictoryLine } from "victory-native";
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';
import moment from "moment";

const CountryScreen = ({ route, navigation }) => {

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

  LogBox.ignoreLogs([' Failed prop type: undefined is not an object']);
  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.covid19api.com/total/country/${country}`)
      .then(response => response.json())
      .then((res) => {
        setCountry(res)
        setLoading(false);
      });
  }

  let filterOutliers = (someArray) => {

    if (someArray.length < 4)
      return someArray;

    let values, q1, q3, iqr, maxValue, minValue;

    values = someArray.slice().sort((a, b) => a - b);//copy array fast and sort

    if ((values.length / 4) % 1 === 0) {//find quartiles
      q1 = 1 / 2 * (values[(values.length / 4)] + values[(values.length / 4) + 1]);
      q3 = 1 / 2 * (values[(values.length * (3 / 4))] + values[(values.length * (3 / 4)) + 1]);
    } else {
      q1 = values[Math.floor(values.length / 4 + 1)];
      q3 = values[Math.ceil(values.length * (3 / 4) + 1)];
    }

    iqr = q3 - q1;
    maxValue = q3 + iqr * 1.5;
    minValue = q1 - iqr * 1.5;

    return values.filter((x) => (x >= minValue) && (x <= maxValue));
  }

  const amount_confirmed = dataCountries.map((a) => a.Confirmed);
  const amount_active = dataCountries.map((a) => a.Active);
  const amount_recovered = dataCountries.map((a) => a.Recovered);
  const amount_death = dataCountries.map((a) => a.Deaths);
  let latest_confirmed = Math.max(...amount_confirmed);
  let latest_active = Math.max(...amount_active);
  let latest_recovered = Math.max(...amount_recovered);
  let latest_deaths = Math.max(...amount_death);
  const screenWidth = Dimensions.get("window").width;

  let dataBarChartRecovered = dataCountries.map(function (country) {
    return {
      y: country.Recovered,
      x: country.Date
    };
  }).filter(item => (item.y !== 0));
  let dataBarChartActive = dataCountries.map(function (country) {
    return {
      y: country.Active,
      x: country.Date
    };
  }).filter(item => (item.y !== 0));
  let dataBarChartDeaths = dataCountries.map(function (country) {
    return {
      y: country.Deaths,
      x: country.Date
    };
  }).filter(item => (item.y !== 0));

  const dataLineChart = filterOutliers(amount_confirmed).slice(-300).filter(item => (item.y !== 0));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading && (
        <Box flex={1} pt="0" _dark={{ bg: "DeepBlue" }} _light={{ bg: "DeepBlue" }} w={{ base: "100%" }} >
          <VStack space={0} alignItems="center">
            <HStack space={2} alignItems="center" paddingTop={2} paddingBottom={2} >
              <CountryFlag isoCode={flag} size={10} style={{ borderRadius: 100, height: 50, width: 50 }} />
            </HStack>
            <Heading size="md" color="white">Total cases: {latest_confirmed.toLocaleString()}</Heading>
            <View style={styles.container} top={-30}>
              <VictoryGroup
                minDomain={{ y: 0 }}
                width={500} height={300}
              >
                <VictoryLine
                  interpolation="natural"
                  data={dataLineChart}
                  labelComponent={<VictoryLabel dy={20} />}
                  style={{
                    data: { stroke: "#fff" }, strokeLinecap: "round",
                    parent: { border: "1px solid #fff" }
                  }}
                />
              </VictoryGroup>
            </View>
          </VStack>
          <Box borderTopRadius={20} top={-140} padding={4} height={400} _dark={{ bg: "white" }} _light={{ bg: "white" }} >
            <Heading size="sm" fontWeight="bold" color="#000" >data for all case types</Heading>
            <VictoryChart width={screenWidth} height={200}  domainPadding={{ x: -15 }} minDomain={{ y: 0 }} domain={{ x: [0, 7], y: [0, 10] }} >
              <VictoryAxis
                tickFormat={(x) => {
                  return moment(x)
                    .format(`DD-MMM`);
                }}
              />
              <VictoryStack
                colorScale={["#FF4757", "#EE5A24", "#7BED9F"]}
              >
                <VictoryBar style={{ data: { width: 30 } }}
                  data={dataBarChartActive}
                />
                <VictoryBar style={{ data: { width: 30 } }}
                  data={dataBarChartDeaths}
                />
                <VictoryBar style={{ data: { width: 30 } }}
                  data={dataBarChartRecovered}
                />
              </VictoryStack>
            </VictoryChart>
            <HStack space={2} alignItems="center" paddingTop={2} paddingBottom={2} >
              <Heading paddingBottom={2} size="sm" color="#7C828A" >Active cases:</Heading>
              <Heading paddingBottom={2} size="sm" color="#7C828A" >{latest_active.toLocaleString()}</Heading>
            </HStack>
            <HStack space={2} alignItems="center" paddingBottom={2} >
              <Heading paddingBottom={2} size="sm" color="#7C828A" >Recovered cases:</Heading>
              <Heading paddingBottom={2} size="sm" color="#7C828A" >{latest_recovered.toLocaleString()}</Heading>
            </HStack>
            <HStack space={2} alignItems="center" paddingBottom={2} >
              <Heading paddingBottom={2} size="sm" color="#7C828A" >Deaths cases:</Heading>
              <Heading paddingBottom={2} size="sm" color="#7C828A" >{latest_deaths.toLocaleString()}</Heading>
            </HStack>
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