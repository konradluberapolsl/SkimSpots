import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import {ActivityIndicator, ColorSchemeName} from "react-native";
import {Image} from "react-native-elements"
import { AuthContext } from "../context/AuthContext";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import AuthenticationNavigator from "./AuthenticationNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";


const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user, login } = React.useContext(AuthContext);

  React.useEffect(() => {
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          login();
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <ActivityIndicator animating={true} color="Black" size="large" />;
  } else {

      return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}

      >
        {user ? <RootNavigator/> : <AuthenticationNavigator />}
      </NavigationContainer>
    );
  }
};

export default Navigation;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const colorScheme = useColorScheme();
    return (
    <Stack.Navigator screenOptions={{
            //headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: Colors[colorScheme].foreground,
        },
        headerTitle: () => (
            <Image
                source={require('../assets/images/logo-text.png')}
                style={{ width: 55 , height: 36, paddingStart: -5 }}
            />
        )
    }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!",
        }}
      />
    </Stack.Navigator>
  );
};
