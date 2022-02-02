import {
  Text,
  HStack,
  Spinner,
  VStack,
  Box,
  FlatList,
  ArrowForwardIcon,
  Spacer
} from "native-base";
import { TouchableOpacity, SafeAreaView, View } from "react-native";
import React, { useState, useEffect } from 'react';
import CountryFlag from "react-native-country-flag";

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

  const GotoPage = (countryName, flag) => {
    navigation.navigate('Country', {
      countryName: countryName,
      flag: flag
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading && (
        <Box
          flex={1}
          pt="3"
          _dark={{ bg: "DeepBlue" }}
          _light={{ bg: "white" }}
          px={4}
          flex={1}
          w={{
            base: "100%",
            md: "25%",
          }}
        >
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="2"
                pr="2"
                py="2"
              >
                <TouchableOpacity onPress={() => GotoPage(item.Country, item.CountryCode)}
                >
                  <HStack space={3} justifyContent="space-between">
                    <CountryFlag isoCode={item.CountryCode} size={25} style={{
                      borderRadius: 100, height: 40, width: 40
                    }} />
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.Country}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        Total Confirmed: {item.TotalConfirmed.toLocaleString()}
                      </Text>
                    </VStack>
                    <Spacer />
                    <ArrowForwardIcon size="sm" mt="0.5" color="DeepBlue" _dark={{
                      color: "white",
                    }}
                      alignSelf="center" />

                  </HStack>
                </TouchableOpacity>
              </Box>
            )}
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

export default CountriesScreen;