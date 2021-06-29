import * as React from "react";
import { getCurrentPremiumPlaces } from "../api/getCurrentPremiumPlaces";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image, FlatList, Pressable } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import Colors from "../constants/Colors";
import PremiumPlace from "../types/PremiumPlace";
import PremiumPlaceItem from "../components/PremiumPlaceItem";

interface OwnProps {
  route: any;
  navigation: any;
}

const HomeScreen = (props: OwnProps) => {
  const { REACT_APP_TEST_KEY } = process.env;
  const yourLocalIP: string =
    REACT_APP_TEST_KEY !== undefined ? REACT_APP_TEST_KEY : "192.168.1.88";
  const [premiumPlaces, setPremiumPlaces] = React.useState<PremiumPlace[]>([]);

  React.useEffect(() => {
    getCurrentPremiumPlaces().then((r) => {
      setPremiumPlaces(r);
    });
  }, []);

  const [blur, setBlur] = React.useState(0);

  const renderItem = ({ item }: any) => (
    <PremiumPlaceItem premiumPlace={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dzisiejsze power spoty.</Text>
      <Text style={styles.subtitle}>Znajdź je i zgadnij dodatkowe punkty!</Text>
      <FlatList
        data={premiumPlaces}
        keyExtractor={(item) => item!!.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 15,
    fontSize: 35,
    textAlign: "center",
    fontFamily: "OpenSans-Light",
  },
  subtitle: {
    fontFamily: "OpenSans-Light",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10,
  },
});
