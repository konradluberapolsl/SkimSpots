import * as React from "react";
import {  StyleSheet } from "react-native";
import { Text, View, Button } from "../components/Themed";
import { AuthContext } from "../context/AuthContext";

const ProfileScreen = () => {

  const { logout} = React.useContext(AuthContext);

  const onLogoutPressed = () => {
      logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button style={{marginTop: 20}} onPress={onLogoutPressed}>Log out</Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
