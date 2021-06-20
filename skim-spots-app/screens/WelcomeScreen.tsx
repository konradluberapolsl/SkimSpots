import * as React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { AuthContext } from "../context/AuthContext";

const WelcomeScreen = () => {
  const { login } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Button title={"Go!"} onPress={() => login()} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
