import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

const ScanScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan</Text>
    </View>
  );
};

export default ScanScreen;

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
