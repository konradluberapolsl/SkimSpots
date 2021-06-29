import React, { useContext } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
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
        <View style={styles.card}>
          <Pressable onPressIn={() => {setBlur(15)}} onPressOut={() => {setBlur(0)}} >
            <Image style={styles.cardImage} source={{ uri: `http://${yourLocalIP}:8000${premiumPlace?.place!!.pathToImages}1.jpg` }} blurRadius={blur}></Image>
          </Pressable>
            {blur != 0 && <Text style={{fontWeight:'bold', fontSize:28, position: 'absolute',textAlign: "center",}}>{premiumPlace?.place?.name}</Text>}
            {blur !=0 && <Text style={{fontSize:35, position: 'absolute',paddingTop: 120,}}>{premiumPlace?.place?.points}+{premiumPlace?.premiumPoints} pkt</Text>}
        </View>
      )
  };

  export default PremiumPlaceItem

  const styles = StyleSheet.create({
    item:{
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    title: {
        fontSize: 20,
        fontFamily: "OpenSans-Light",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
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
      },
      cardImage:{
        flex: 1,
        height: 250,
        width: 350,
        borderRadius: 50,
      },
});