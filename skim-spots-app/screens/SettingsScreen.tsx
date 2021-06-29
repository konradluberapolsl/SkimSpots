import * as React from "react";
import { StyleSheet, Switch } from "react-native";
import { Text, View } from "../components/Themed";
import { DARK, ThemeContext } from "../context/ThemeContext";
import useColorScheme from "../hooks/useColorScheme";

const SettingsScreen = () => {
  const { toggleTheme, darkTheme } = React.useContext(ThemeContext);
  const [systemTheme, setSystemTheme] = React.useState<boolean>(true);

  const systemColorScheme = useColorScheme();
  const setSystemColorScheme = (val: boolean) => {
    setSystemTheme(val);

    if (systemColorScheme === DARK) {
      toggleTheme(true);
    } else {
      toggleTheme(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ustawienia</Text>
      <View style={styles.row}>
        <Text style={styles.settingLabel}>Motyw systemowy</Text>
        <Switch value={systemTheme} onValueChange={setSystemColorScheme} />
      </View>
      <View style={styles.row}>
        <Text style={styles.settingLabel}>Motyw ciemny</Text>
        <Switch
          value={darkTheme}
          onValueChange={toggleTheme}
          disabled={systemTheme}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  row: {
    marginTop: 5,
    flexDirection: "row",
  },
  settingLabel: {
    fontSize: 16,
    width: "85%",
  },
});
