import * as React from "react";
import {Image, Pressable, StyleSheet, TouchableOpacity} from "react-native";
import { Text, View } from "./Themed";
import UserPoints from "../types/UserPoints";
import Place from "../types/Place";
import {ThemeContext} from "../context/ThemeContext";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";




const VisitedPlacesItem = ({place, onPress} : any) => {

    const { REACT_APP_TEST_KEY } = process.env;
    const yourLocalIP: string =
        REACT_APP_TEST_KEY !== undefined ? REACT_APP_TEST_KEY : "192.168.0.80";

    const { theme } = React.useContext(ThemeContext);

    return (
        <View style={[styles.item,{borderColor: Colors[theme].text}]}>
            <TouchableOpacity onPress={onPress}>
                <Image
                source={{ uri: `http://${yourLocalIP}:8000${place!!.pathToImages}1.jpg` }}
                resizeMethod="resize"
                // resizeMode="contain"
                style={{width: ( 0.42 * Layout.window.height), height: (0.25 * Layout.window.height), borderTopLeftRadius: 20, borderTopRightRadius: 20, }}
            />
                <View style={{marginHorizontal: 20, marginBottom: 10, marginTop: 10}}>
                    <Text style={styles.title}>{place.name}</Text>
                    <Text style={[styles.title, {color: Colors[theme].secondaryText} ]}>{place.estimatedLocalization}</Text>
                </View>

            </TouchableOpacity>

        </View>
    );
};

export default VisitedPlacesItem;

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
});
