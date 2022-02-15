import React from 'react';
import { Button, Icon } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

export default function (props) {
  return (
    <Button _dark={{ bg: "darkBlue.50" }} _light={{ bg: "DeepBlue" }} size="lg" w="300" leftIcon={<Icon as={Ionicons} name={props.iconName} size="sm" />}
      style={{
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
      }}
      onPress={props.onPress}
    >{props.title}</Button>
  );
}