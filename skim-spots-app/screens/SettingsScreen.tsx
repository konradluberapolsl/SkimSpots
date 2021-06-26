import * as React from "react";
import { StyleSheet, Switch } from "react-native";
import { Text, View } from "../components/Themed";
import { ThemeContext } from "../context/ThemeContext";
import useColorScheme from "../hooks/useColorScheme";

const SettingsScreen = () => {
  const { toggleTheme, darkTheme } = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* <View style={styles.row}>
        <Text>System theme</Text>
        <Switch value={test} onValueChange={() => setTest(!test)} />
      </View> */}
      <View style={styles.row}>
        <Text>Dark mode</Text>
        <Switch
          value={darkTheme}
          onValueChange={toggleTheme}
          // disabled={test}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

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
  row: {
    flexDirection: "row",
  },
});
