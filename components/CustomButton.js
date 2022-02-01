import React from 'react';
import { Button } from 'native-base';

export default function (props) {
  return (
    <Button _dark={{ bg: "darkBlue.50" }} _light={{ bg: "DeepBlue" }} size="lg" w="200"
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