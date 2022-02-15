import { Text, Box, VStack, Link } from "native-base";
import React from "react";
import CovidSocial from '../assets/img/covidMedical.svg';

const AboutScreen = () => {

  return (
    <Box pt={5} px={6}
      _dark={{ bg: "DeepBlue" }}
      _light={{ bg: "white" }}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Text fontSize="3xl" >About CovidTracker</Text>
        <CovidSocial height={300} width={300} />
        <Text fontSize="xl">
          This app shows the historical data of each country using the
          {" "}
          <Link mt={-1} href="https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest" isExternal _text={{
            color: "blue.400", fontSize: "xl",
          }}  >
            COVID19API
          </Link>API.
        </Text>
      </VStack>
    </Box>
  );
}

export default AboutScreen;

