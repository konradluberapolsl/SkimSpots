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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's power spots.</Text>
      <Text style={styles.subtitle}>
        Find those spots and get extra points!
      </Text>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={premiumPlaces}
        horizontal={false}
        keyExtractor={(item) => item!!.id.toString()}
        renderItem={(post) => {
          const item = post.item;
          return (
            <View style={styles.card}>
              <Pressable
                onPressIn={() => {
                  setBlur(15);
                }}
                onPressOut={() => {
                  setBlur(0);
                }}
              >
                <Image
                  style={styles.cardImage}
                  source={{
                    uri: `http://${yourLocalIP}:8000${
                      item?.place!!.pathToImages
                    }1.jpg`,
                  }}
                  blurRadius={blur}
                ></Image>
              </Pressable>
              {blur != 0 && (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 28,
                    position: "absolute",
                    textAlign: "center",
                  }}
                >
                  {item?.place?.name}
                </Text>
              )}
              {blur != 0 && (
                <Text
                  style={{
                    fontSize: 35,
                    position: "absolute",
                    paddingTop: 120,
                  }}
                >
                  {item?.place?.points} + {item?.premiumPoints} pkt
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: "center",
  },
  separator: {
    marginTop: 10,
  },
  card: {
    marginVertical: 8,
    paddingTop: 20,
    flexBasis: "47%",
    marginHorizontal: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardImage: {
    flex: 1,
    height: 250,
    width: 350,
    borderRadius: 50,
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10,
  },
});
