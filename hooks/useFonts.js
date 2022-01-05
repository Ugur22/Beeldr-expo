import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    robotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    roboto: require('../assets/fonts/Roboto-Regular.ttf'),
  });