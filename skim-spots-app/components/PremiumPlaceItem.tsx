import React, { useContext } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image, Pressable, TouchableOpacity, View as DefaultView } from "react-native";
import Colors from "../constants/Colors";
import PremiumPlace from "../types/PremiumPlace";
import { View, Text } from "./Themed";
import { ThemeContext } from "../context/ThemeContext";
import Layout from "../constants/Layout";

interface PremiumPlaceItemProps {
    premiumPlace: PremiumPlace;
  }

const PremiumPlaceItem = ({ premiumPlace}: PremiumPlaceItemProps) => {

    const { REACT_APP_TEST_KEY } = process.env;
    const yourLocalIP: string =
        REACT_APP_TEST_KEY !== undefined ? REACT_APP_TEST_KEY : "192.168.0.80";

    const { theme } = React.useContext(ThemeContext);
    const [blur, setBlur] = React.useState(0);

    return (
        <View style={ styles.card}>
          <Pressable onPressIn={() => {setBlur(15)}} onPressOut={() => {setBlur(0)}} >

              <Image style={{width: ( 0.42 * Layout.window.height), height: (0.25 * Layout.window.height), borderRadius: 20, }}
                   source={{ uri: `http://${yourLocalIP}:8000${premiumPlace!!.place!!.pathToImages}1.jpg` }} blurRadius={blur} />

              <DefaultView style={[styles.cardOverlay,{borderColor: Colors[theme].text}]}>
                  {blur != 0 &&
                  <Image
                      source={require("../assets/images/logo-white.png") }
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={[{width: 30, height: 50, marginTop: 20}]}
                  />
                  }
                  {blur != 0 && <Text style={[styles.text,{fontSize:35, }]}>{premiumPlace?.place?.points}+{premiumPlace?.premiumPoints} pkt</Text>}
                  {blur != 0 && <Text style={[styles.text,{fontSize:28}]}>{premiumPlace?.place?.estimatedLocalization}</Text>}
              </DefaultView>

          </Pressable>

        </View>
      )
  };

  export default PremiumPlaceItem

  const styles = StyleSheet.create({
    item:{
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
      cardOverlay:{
          position: 'absolute',
          borderWidth: 0.5,
          borderRadius: 20,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
      },
    text: {
        fontSize: 20,
        fontFamily: "OpenSans-Light",
        marginVertical: 5,
        color: "#fff"
    },
    card:{
        marginVertical: 8,
        paddingTop: 20,
        flexBasis: '47%',
        marginHorizontal: 5,
        borderRadius: 50,
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: "center",
      }
});