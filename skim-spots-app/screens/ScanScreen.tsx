import * as React from "react";
import {StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { Text, View, Button } from "../components/Themed";
import {Appbar} from "react-native-paper"; // <-- TEMP!!!!! TODO: Find better solution.
import {View as DefaultView} from "react-native"
import Place from "../types/Place";
import {getPlaceByName} from "../api/getPlaceByName";
import {getPlacesNames} from "../api/getPlacesNames";
import {getUserByID} from "../api/getUserByID";
import { BarCodeScanner,  BarCodeScannerResult } from 'expo-barcode-scanner';
import { BlurView } from 'expo-blur';
import {useState, useEffect} from "react";
import {BarcodeMask} from "@nartc/react-native-barcode-mask";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import {Image} from "react-native-elements";
import {PlaceContext} from "../context/PlaceContext";
import {AuthContext} from "../context/AuthContext";
import {postUserPlace} from "../api/postUserPlace";


const ScanScreen = ({ navigation }: any) => {

  const colorScheme = useColorScheme();

  const [placesNames, setPlacesName] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [successScan, setSuccessScan] = useState(false);
  const [place, setPlace] = useState<Place>(null);

  const { userPlaces, save } = React.useContext(PlaceContext);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    getPlacesNames().then((data) => setPlacesName(data))
  }, []);

  useEffect(() => {
    if(place != null){
      setScanned(true);
      setSuccessScan(true);
    }
  },[place])

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const {type, data} = scanningResult;
      const text = data.split(/\r?\n/)

      if(text.length > 1){
        if (placesNames.includes(text[1])){
          for (let p of userPlaces ){
            if (p!!.place!!.name == text[1]){
              setPlace(p!!.place);
              break;
            }
            else if (userPlaces.indexOf(p) == userPlaces.length-1) {
              getPlaceByName(text[1]).then( res => {
                setPlace(res);
                postUserPlace(res!!.id, user!!.id).then( r => {
                  save(user!!);
                });
              });
            }
          }
        }
        else{
          setScanned(true);
          alert("Nie rozpoznano kodu :(");
        }

      }
      else{
        setScanned(true);
        alert("Nie rozpoznano kodu :(");
      }

      //setScanned(true);
    }
  };

  const onGoButtonClicked = () => {
    navigation.navigate("PlaceDetailsScreen", {place: place!!})
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const dialogTextColor = Colors[colorScheme].secondaryText;


  return (
      <View style={styles.container}>


        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject,]}
        />

        {scanned && !successScan &&
        <Button
            style={[{backgroundColor: Colors[colorScheme].background} , styles.scanAgainButton]}
            onPress={() =>{
              setScanned(false);
              setSuccessScan(false);
              }}>
          Scan Again
        </Button>}

        {successScan &&
        <View
            style={[{backgroundColor: Colors[colorScheme].background+"9F"},styles.resultDialog]}>
          <Appbar.BackAction
              color={Colors[colorScheme].white}
              style={styles.backButton}
              onPress={() => {
                setSuccessScan(false);
                setScanned(false);
              }}
          />
          <Image
              source={ colorScheme=="dark" ? require('../assets/images/logo-light.png'): require('../assets/images/logo-dark.png')}
              style={{ width: 40 , height: 60, marginBottom: 20 }}
          />
          <Text style={[{color: dialogTextColor}, styles.resultDialogText]}>Za ten spot otrzymujesz:</Text>
          <Text style={[{color: dialogTextColor}, styles.resultDialogText]}>{place!!.points} ptk</Text>
          <Text style={[{color: dialogTextColor, marginTop: 100},styles.resultDialogText]} >{place!!.welcomeText}</Text>
          <Button style={styles.goButton} onPress={onGoButtonClicked}>GO!</Button>
        </View> }

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
  resultDialog:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 75,
    paddingHorizontal: 50,
    borderRadius: 15,
    width: '90%',
    height: '75%',

  },
  resultDialogText:{
    fontSize: 24,
    textAlign: "center"
  },
  scanAgainButton:{
    position: "absolute",
    bottom: 5,
    width: "45%",
  },
  goButton:{
    width: '80%',
    marginTop: '20%'
  },
  backButton:{
    position: "absolute",
    left: 10,
    top: 10
  }

});
