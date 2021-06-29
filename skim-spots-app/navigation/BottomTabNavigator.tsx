import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";

import {
  BottomTabParamList,
  ProfileParamList,
  HomeParamList,
  SettingsParamList,
  ScanParamList,
} from "../types";
import SettingsScreen from "../screens/SettingsScreen";
import ScanScreen from "../screens/ScanScreen";
import { Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import AllPlaceCommentsScreen from "../screens/AllPlaceCommentsScreen";
import { ThemeContext } from "../context/ThemeContext";
import RankingScreen from "../screens/RankingScreen";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { theme } = React.useContext(ThemeContext);

  const label = function label(route : any) : string{
      if (route.name == "Profile") {
          return "Profil";
      } else if (route.name == "Home") {
          return "Power Spots";
      } else if (route.name == "Scan") {
          return "Skanuj";
      } else if (route.name == "Settings")
          return "Ustawienia";
      return ""
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name == "Profile") {
            iconName = "person";
          } else if (route.name == "Home") {
            iconName = "flame";
          } else if (route.name == "Scan") {
            iconName = "scan-outline";
          } else if (route.name == "Settings") iconName = "settings";

          // You can return any component that you like here!
          // @ts-ignore
          return <Ionicons name={iconName} size={23} color={color} />;
        },
          tabBarLabel: label(route),
      }
      )}
      barStyle={{ backgroundColor: Colors[theme].foreground }}

    >
      <BottomTab.Screen
        name="Profile"

        component={ProfileNavigator}
        options={{
        }}
      />
      <BottomTab.Screen name="Home" component={HomeNavigator} />

      <BottomTab.Screen name="Scan" component={ScanNavigator} options={{}} />

      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{}}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const ProfileStack = createStackNavigator<ProfileParamList>();

const ProfileNavigator = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <ProfileStack.Navigator
      screenOptions={{
        header: (props) => (
          <Header navigation={props.navigation} previous={props.previous} />
        ),
      }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />

      <ProfileStack.Screen name="RankingScreen" component={RankingScreen} />
    </ProfileStack.Navigator>
  );
};

const HomeStack = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        header: (props) => (
          <Header navigation={props.navigation} previous={props.previous} />
        ),
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const ScanStack = createStackNavigator<ScanParamList>();

const ScanNavigator = () => {
  return (
    <ScanStack.Navigator
      screenOptions={{
        header: (props) => (
          <Header navigation={props.navigation} previous={props.previous} />
        ),
      }}
    >
      <ScanStack.Screen name="ScanScreen" component={ScanScreen} />
      <ScanStack.Screen
        name="PlaceDetailsScreen"
        component={PlaceDetailsScreen}
      />

      <ScanStack.Screen
        name={"AllPlaceCommentsScreen"}
        component={AllPlaceCommentsScreen}
      />
    </ScanStack.Navigator>
  );
};

const SettingsStack = createStackNavigator<SettingsParamList>();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        header: (props) => (
          <Header navigation={props.navigation} previous={props.previous} />
        ),
      }}
    >
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};
