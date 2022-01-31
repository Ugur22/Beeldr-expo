import {
  Text,
  VStack,
  HStack,
  Box,
  Heading
} from "native-base";
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, Dimensions, StyleSheet } from "react-native";
import CountryFlag from "react-native-country-flag";
import { VictoryStack, VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryLine } from "victory-native";

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


  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.covid19api.com/total/country/${country}`)
      .then(response => response.json())
      .then((res) => {
        setCountry(res)
        setLoading(false);
      });
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

 let  dataCases = dataCountries.map(function (country) {
    return {
      y: country.Active,
      x: country.Date.slice(0,10)
    };
  });



  dataCases = dataCases.filter(item => (item.y !== 0));

   dataCases = dataCases.slice(1).slice(-100)



  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading && (
        <Box flex={1} pt="0" _dark={{ bg: "#4B4F72" }} _light={{ bg: "#4B4F72" }} w={{ base: "100%" }} >
          <VStack space={0} alignItems="center">
            <HStack space={2} alignItems="center" paddingTop={2} paddingBottom={2} >
              <CountryFlag isoCode={flag} size={10} style={{ borderRadius: 100, height: 50, width: 50 }} />
            </HStack>
            <Heading size="md" color="white">Total cases: {latest_confirmed.toLocaleString()}</Heading>
            <View style={styles.container} top={-90}>
            <VictoryGroup
             minDomain={{ y: 0 }}
                width={500} height={300}
              >
  
                <VictoryLine
                  interpolation="natural"
                  data={dataCases}
                  style={{
                    data: { stroke: "#fff" }, strokeLinecap: "round",
                    parent: { border: "1px solid #fff" }
                  }}
                />
              </VictoryGroup>
            </View>
          </VStack>
          <Box borderTopRadius={20} top={-180} padding={4} height={400} _dark={{ bg: "white" }} _light={{ bg: "white" }} >
            <Heading size="sm" fontWeight="bold" color="#000" >All cases</Heading>
            <VictoryChart width={screenWidth} height={200} domainPadding={{ x: 15 }} minDomain={{ y: 0 }}>
              <VictoryStack
                colorScale={["tomato", "orange", "gold"]}
              >
                <VictoryBar style={{ data: { width: 30 } }}
                  data={[{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 5 }, { x: "d", y: 5 }, { x: "e", y: 5 }]}
                />
                <VictoryBar style={{ data: { width: 30 } }}
                  data={[{ x: "a", y: 1 }, { x: "b", y: 4 }, { x: "c", y: 5 }, { x: "d", y: 5 }, { x: "e", y: 5 }]}
                />
                <VictoryBar style={{ data: { width: 30 } }}
                  data={[{ x: "a", y: 3 }, { x: "b", y: 2 }, { x: "c", y: 6 }, { x: "d", y: 5 }, { x: "e", y: 5 }]}
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