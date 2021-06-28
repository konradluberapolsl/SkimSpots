import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "../components/Themed";
import Toast from "react-native-root-toast";
import { API_CONNECTION_ERROR } from "../constants/Strings";
import ApiConnectionErrorToast from "../components/ApiConnectionErrorToast";

const HomeScreen = () => {
  const [visibleToast, setVisibleToast] = React.useState(false);
  const showToast = () => {
    setVisibleToast(true);
    setTimeout(() => setVisibleToast(false), 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <ApiConnectionErrorToast visible={visibleToast} />
    </View>
  );
};

export default HomeScreen;

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
