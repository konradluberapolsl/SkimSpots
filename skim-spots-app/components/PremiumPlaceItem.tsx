import React, { useContext } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import PremiumPlace from "../types/PremiumPlace";
import { View, Text } from "./Themed";
import { ThemeContext } from "../context/ThemeContext";
import Layout from "../constants/Layout";

const PremiumPlaceItem = ({ premiumPlace, onPress}: any) => {

    const { REACT_APP_TEST_KEY } = process.env;
    const yourLocalIP: string =
        REACT_APP_TEST_KEY !== undefined ? REACT_APP_TEST_KEY : "192.168.0.80";



    const { theme } = React.useContext(ThemeContext);
    const [blur, setBlur] = React.useState(0);
    return (
        <View style={[styles.item,{borderColor: Colors[theme].text}]}>
                <View style={{marginHorizontal: 20, marginBottom: 10, marginTop: 10}}>
                    <Text style={styles.title}>Hi</Text>
                    <Text style={[styles.title, {color: Colors[theme].secondaryText} ]}>Hello</Text>
                </View>
      </View>
    );
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
});