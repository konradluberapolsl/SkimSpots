import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
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
import Header from "../components/Header";


const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user, login, register } = React.useContext(AuthContext);

  React.useEffect(() => {
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
            login(JSON.parse(userString));
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

const RootNavigator = ({navigation}: any) => {
    const colorScheme = useColorScheme();
    return (
    <Stack.Navigator
        screenOptions={{
            header: (props) => <Header navigation={props.navigation} previous={props.previous} />
    }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!",
        }}
      />
    </Stack.Navigator>
  );
};
