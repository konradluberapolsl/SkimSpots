import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import { AuthenticationParamList } from "../types";
import * as React from "react";

const AuthenticationStack = createStackNavigator<AuthenticationParamList>();

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator initialRouteName="WelcomeScreen">
      <AuthenticationStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
