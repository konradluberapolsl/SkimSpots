import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { PlaceProvider } from "./context/PlaceContext";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { RootSiblingParent } from "react-native-root-siblings";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const { theme } = useContext(ThemeContext);

  let [fontsLoaded] = useFonts({
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-LightItalic": require("./assets/fonts/OpenSans-LightItalic.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-ExtraBold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    Pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
  });

  if (!isLoadingComplete && !fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <RootSiblingParent>
        <ThemeProvider>
          <PlaceProvider>
            <AuthProvider>
              <SafeAreaProvider>
                <Navigation colorScheme={theme} />
                <StatusBar />
              </SafeAreaProvider>
            </AuthProvider>
          </PlaceProvider>
        </ThemeProvider>
      </RootSiblingParent>
    );
  }
};

export default App;
