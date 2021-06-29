import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View, Button } from "../components/Themed";
import { Appbar } from "react-native-paper"; // <-- TEMP!!!!! TODO: Find better solution.
import Place from "../types/Place";
import { getPlaceByName } from "../api/getPlaceByName";
import { getPlacesNames } from "../api/getPlacesNames";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import { Image } from "react-native-elements";
import { PlaceContext } from "../context/PlaceContext";
import { AuthContext } from "../context/AuthContext";
import { postUserPlace } from "../api/postUserPlace";
import { ThemeContext } from "../context/ThemeContext";
import { getUserPointsByUserID } from "../api/getUserPointsByUserID";
import { updateUserPoints } from "../api/updateUserPoints";
import PremiumPlace from "../types/PremiumPlace";
import { getCurrentPremiumPlaces } from "../api/getCurrentPremiumPlaces";

const ScanScreen = ({ navigation }: any) => {
  const { theme } = React.useContext(ThemeContext);

  const [placesNames, setPlacesName] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [visited, setVisited] = useState(false);
  const [isPremium, setPremium] = useState(false);
  const [successScan, setSuccessScan] = useState(false);

  const [place, setPlace] = useState<Place>(null);
  const [premiumPlaces, setPremiumPlaces] = React.useState<PremiumPlace[]>([]);
  const [additionalPoints, setAdditionalPoints] = React.useState(0);

  const { userPlaces, save } = React.useContext(PlaceContext);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    getPlacesNames().then((data) => setPlacesName(data));
    getCurrentPremiumPlaces().then((r) => {
      setPremiumPlaces(r);
    });
  }, []);

  useEffect(() => {
    if (place != null) {
      setScanned(true);
      setSuccessScan(true);
    }
  }, [place]);

  const postPlaceAndUpdatePoints = (p: any, additionalPoints: number) => {
    postUserPlace(p.id, user!!.id).then((r) => {
      save(user!!);
      getUserPointsByUserID(user!!.id).then((d) => {
        let amount = d!!.amount + p!!.points + additionalPoints;
        updateUserPoints(user!!.id, amount);
      });
    });
  };

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { type, data } = scanningResult;
      const text = data.split(/\r?\n/);
      setPremium(false);
      let placeFound = false;
      let power = false;
      if (text.length > 1) {
        if (placesNames.includes(text[1])) {
          if (userPlaces.length !== 0) {
            for (let p of userPlaces) {
              if (p!!.place!!.name == text[1]) {
                setPlace(p!!.place);
                setVisited(true);
                placeFound = true;
                break;
              }
            }
          }
          if (!placeFound) {
            setVisited(false);
            if (premiumPlaces.length != 0) {
              for (let p of premiumPlaces) {
                if (p!!.place!!.name == text[1]) {
                  power = true;
                  setPlace(p!!.place!!);
                  setPremium(true);
                  setAdditionalPoints(p!!.premiumPoints);
                  postPlaceAndUpdatePoints(p!!.place!!, p!!.premiumPoints);
                  break;
                }
              }
            }
            if (!power) {
              getPlaceByName(text[1]).then((res) => {
                setPlace(res);
                postPlaceAndUpdatePoints(res, 0);
              });
            }
          }
        } else {
          setScanned(true);
          alert("Nie rozpoznano kodu :(");
        }
      } else {
        setScanned(true);
        alert("Nie rozpoznano kodu :(");
      }

      //setScanned(true);
    }
  };

  const onGoButtonClicked = () => {
    navigation.navigate("PlaceDetailsScreen", { place: place!! });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const dialogTextColor = Colors[theme].secondaryText;

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject]}
      />

      {scanned && !successScan && (
        <Button
          style={[
            { backgroundColor: Colors[theme].background },
            styles.scanAgainButton,
          ]}
          onPress={() => {
            setScanned(false);
            setSuccessScan(false);
          }}
        >
          Skanuj ponownie
        </Button>
      )}

      {successScan && (
        <View
          style={[
            { backgroundColor: Colors[theme].background + "9F" },
            styles.resultDialog,
          ]}
        >
          <Appbar.BackAction
            color={Colors[theme].white}
            style={styles.backButton}
            onPress={() => {
              setSuccessScan(false);
              setScanned(false);
            }}
          />
          {visited && (
            <Text
              style={[
                { color: dialogTextColor, marginBottom: 10 },
                styles.resultDialogText,
              ]}
            >
              Witaj ponownie!
            </Text>
          )}

          <Image
            source={
              theme == "dark"
                ? require("../assets/images/logo-light.png")
                : require("../assets/images/logo-dark.png")
            }
            style={{ width: 40, height: 60, marginBottom: 20 }}
          />

          {visited && (
            <Text style={[{ color: dialogTextColor }, styles.resultDialogText]}>
              Za ten spot przytuliłeś/aś:
            </Text>
          )}
          {!visited && (
            <Text style={[{ color: dialogTextColor }, styles.resultDialogText]}>
              Za ten spot otrzymujesz:
            </Text>
          )}

          <Text style={[{ color: dialogTextColor }, styles.resultDialogText]}>
            {place!!.points} pkt
          </Text>

          {isPremium && (
            <Text
              style={[
                { color: dialogTextColor, marginTop: 10 },
                styles.resultDialogText,
              ]}
            >
              Gratulacje!
            </Text>
          )}

          {isPremium && (
            <Text style={[{ color: dialogTextColor }, styles.resultDialogText]}>
              To Power Spot, otrzymujesz:
            </Text>
          )}
          {isPremium && (
            <Text
              style={[
                { color: dialogTextColor, fontFamily: "OpenSans-Regular" },
                styles.resultDialogText,
              ]}
            >
              + {additionalPoints} pkt
            </Text>
          )}

          <Text
            style={[
              { color: dialogTextColor, marginTop: 100 },
              styles.resultDialogText,
            ]}
          >
            {place!!.welcomeText}
          </Text>
          <Button style={styles.goButton} onPress={onGoButtonClicked}>
            GO!
          </Button>
        </View>
      )}
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
  resultDialog: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 75,
    paddingHorizontal: 50,
    borderRadius: 15,
    width: "90%",
    height: "80%",
  },
  resultDialogText: {
    fontSize: 16,
    textAlign: "center",
  },
  scanAgainButton: {
    position: "absolute",
    bottom: 5,
    width: "45%",
  },
  goButton: {
    width: "80%",
    marginTop: "20%",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
  },
});
