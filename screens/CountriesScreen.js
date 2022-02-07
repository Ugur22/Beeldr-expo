import { HStack, Spinner, Box, FlatList } from "native-base";
import { SafeAreaView, View } from "react-native";
import React, { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';

const CountriesScreen = ({ navigation }) => {

  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();

  }, [])

  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.covid19api.com/summary`)
      .then(response => response.json())
      .then((res) => {
        setData(filterHighestCases(res.Countries));
        setLoading(false);
      });
  }

  const filterHighestCases = (countries) => {
    return countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading && (
        <Box flex={1} pt="3" _dark={{ bg: "DeepBlue" }} _light={{ bg: "white" }} px={4} flex={1} w={{ base: "100%", md: "25%" }}>
          <FlatList
            data={data} initialNumToRender={10}
            renderItem={_renderitem}
            keyExtractor={(item) => item.ID}
          />
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

const _renderitem = ({ item }) => <CountryCard item={item} />;

export default CountriesScreen;