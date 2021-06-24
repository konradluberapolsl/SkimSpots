import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";
import {PlaceProvider} from "./context/PlaceContext";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
    'OpenSans-LightItalic': require('./assets/fonts/OpenSans-LightItalic.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
    'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf')
  });


  if (!isLoadingComplete && !fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <PlaceProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>

{/*        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>*/}
          </AuthProvider>
        </PlaceProvider>
    );
  }
};

export default App;
