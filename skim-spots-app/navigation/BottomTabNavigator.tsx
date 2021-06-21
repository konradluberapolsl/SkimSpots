import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
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

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();


const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Profile"

      screenOptions={
          ({ route }) => ({
              tabBarIcon: ({ focused, color}) => {
                  let iconName;

                  if (route.name == 'Profile') {
                      iconName = 'person';
                  } else if (route.name == 'Home') {
                      iconName = 'home';
                  } else if (route.name == 'Scan') {
                      iconName = 'scan-outline';
                  } else if(route.name == 'Settings')
                      iconName = 'settings'

                  // You can return any component that you like here!
                  // @ts-ignore
                  return <Ionicons name={iconName} size={23} color={color}  />;
              },

          })}
      barStyle={{ backgroundColor: Colors[colorScheme].foreground }}
    >
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{

        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
      />

      <BottomTab.Screen
        name="Scan"
        component={ScanNavigator}
        options={{
        }}
      />

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
    const colorScheme = useColorScheme();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
            headerShown: false,
            headerTitle: "Profile Title",
            headerStyle: {
                backgroundColor: Colors[colorScheme].foreground,
            },
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{marginEnd:20}}
                onPress={() => {
                  logout();
                }}
              >
                <Text style={{color: Colors[colorScheme].text}}>LOGOUT</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

const HomeStack = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
    const colorScheme = useColorScheme();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
            headerShown: false,
            headerTitle: "Home Title",
            headerStyle: {
                backgroundColor: Colors[colorScheme].foreground,
            },
        }}
      />
    </HomeStack.Navigator>
  );
};

const ScanStack = createStackNavigator<ScanParamList>();

const ScanNavigator = () => {
    const colorScheme = useColorScheme();

  return (
    <ScanStack.Navigator>
      <ScanStack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{
            headerShown: false,
            headerTitle: "Scan Title",
            headerStyle: {
                backgroundColor: Colors[colorScheme].foreground,
            },
        }}
      />
    </ScanStack.Navigator>
  );
};

const SettingsStack = createStackNavigator<SettingsParamList>();

const SettingsNavigator = () => {
    const colorScheme = useColorScheme();
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
            headerShown: false,
            headerTitle: "Settings Title",
            headerStyle: {
                backgroundColor: Colors[colorScheme].foreground,
            },
        }}
      />
    </SettingsStack.Navigator>
  );
};
