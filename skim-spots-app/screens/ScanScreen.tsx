import * as React from "react";
import {StyleSheet, Button, Dimensions, TouchableOpacity} from "react-native";
import { Text, View } from "../components/Themed";
import Place from "../types/Place";
import {getPlaceByName} from "../api/getPlaceByName";
import {getPlacesNames} from "../api/getPlacesNames";
import {getUserByID} from "../api/getUserByID";
import { BarCodeScanner,  BarCodeScannerResult } from 'expo-barcode-scanner';

import {useState, useEffect} from "react";
import {BarcodeMask} from "@nartc/react-native-barcode-mask";


const ScanScreen = () => {

  const [placesNames, setPlacesName] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [successScan, setSuccessScan] = useState(false);
  const [place, setPlace] = useState<Place>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    getPlacesNames().then((data) => setPlacesName(data))

  }, []);

  useEffect(() => {
    if(place != null){
      alert(place.welcomeText);
    }
  },[place])

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const {type, data} = scanningResult;
      setScanned(true);
      console.log(data.split(/\r?\n/))
      const text = data.split(/\r?\n/)
      if(text.length > 1){
        if (placesNames.includes(text[1])){
          setSuccessScan(true);
          alert("Udało się!");
          getPlaceByName(text[1]).then( res => setPlace(res));
        }
        else
          alert("Nie rozpoznano kodu :(");
      }
      else
        alert("Nie rozpoznano kodu :(");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
      <View style={styles.container}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
