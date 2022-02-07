import { VStack, HStack, Box, Heading, Spinner } from "native-base";
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Dimensions, StyleSheet, ScrollView, LogBox,PixelRatio } from "react-native";
import CountryFlag from "react-native-country-flag";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryVoronoiContainer, VictoryAxis, VictoryArea, VictoryLabel, VictoryLegend } from "victory-native";
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

  const amount_confirmed = dataCountries.map((a) => a.Confirmed);
  const amount_active = dataCountries.map((a) => a.Active);
  const amount_recovered = dataCountries.map((a) => a.Recovered);
  const amount_death = dataCountries.map((a) => a.Deaths);
  let latest_confirmed = Math.max(...amount_confirmed);
  let latest_active = Math.max(...amount_active);
  let latest_recovered = Math.max(...amount_recovered);
  let latest_deaths = Math.max(...amount_death);
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
            <View style={styles.container} top={0} height={100}>
              <VictoryGroup
                minDomain={{ y: 0 }}
                width={520} height={300}
                containerComponent={
                  <VictoryVoronoiContainer
                    mouseFollowTooltips
                    voronoiDimension="x"
                    labels={({ datum }) => `${datum.y.toLocaleString()}`}
                    labelComponent={<VictoryLabel dy={-20} dx={-80}
                      style={[
                        { fill: "white", fontSize: 16 }
                      ]}
                      backgroundPadding={[
                        3,
                        { left: 20, right: 20 },
                        { left: 20 }
                      ]}
                      backgroundStyle={[
                        { fill: "white", opacity: 0.2 },
                      ]} />}
                  />
                }
              >
                <VictoryArea
                  interpolation="natural"
                  data={getDataBarChart('Confirmed').filter(item => (item.y !== 0))}
                  fixLabelOverlap={false}
                  style={{
                    data: { stroke: "#fff", fill: "rgba(52, 52, 52, 0.5)" }, strokeLinecap: "round",
                    parent: { border: "1px solid #fff" }
                  }}
                />
              </VictoryGroup>
            </View>
          </VStack>
          <Box borderTopRadius={0} flex={1}  style={{top: 52 }} padding={6} _dark={{ bg: "white" }} _light={{ bg: "white" }} >

            <ScrollView showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <VictoryChart width={screenWidth} domainPadding={10} minDomain={{ y: 0 }}   height={screenHeight > 700 ? 300 : 210}>

                <VictoryAxis dependentAxis tickFormat={x => (x >= 1000000 ? `${x / 1000000}m` : x >= 1000 ? `${x / 1000}k` : `${x}`)} offsetX={45} />
                <VictoryAxis tickFormat={(x) => {
                  return moment(x)
                    .format(`D MMM`);
                }}
                  style={{ tickLabels: { fontSize: 12 } }}
                />
                <VictoryGroup offset={10}
                  colorScale={["#FF4757", "#EE5A24", "#7BED9F"]}
                >
                  <VictoryBar
                    data={getDataBarChart('Deaths', 100, 105)}
                  />
                  <VictoryBar
                    data={getDataBarChart('Active', 100, 105)}
                  />
                  <VictoryBar
                    data={getDataBarChart('Recovered', 100, 105)}
                  />
                </VictoryGroup>
                <VictoryLegend x={0} y={0}
                  centerTitle
                  orientation="horizontal"
                  colorScale={["#FF4757", "#EE5A24", "#7BED9F"]}
                  gutter={20}
                  style={{ labels: { fontSize: 16 } }}
                  data={[
                    { name: "Deaths" }, { name: "Active" }, { name: "Recovered" }
                  ]}
                />
              </VictoryChart>
              <HStack alignItems="center" paddingBottom={2} >
                <Heading paddingBottom={2} size="sm" color="black" >Active cases:</Heading>
                <Heading paddingBottom={2} size="sm" color="black" > {latest_active.toLocaleString()}</Heading>
              </HStack>
              <HStack space={2} alignItems="center" paddingBottom={2} >
                <Heading paddingBottom={2} size="sm" color="black" >Recovered cases:</Heading>
                <Heading paddingBottom={2} size="sm" color="black" >{latest_recovered.toLocaleString()}</Heading>
              </HStack>
              <HStack space={2} alignItems="center" paddingBottom={2} >
                <Heading paddingBottom={2} size="sm" color="black" >Death cases:</Heading>
                <Heading paddingBottom={2} size="sm" color="black" >{latest_deaths.toLocaleString()}</Heading>
              </HStack>
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