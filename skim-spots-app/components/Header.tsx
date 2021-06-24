import React from "react";
import {Appbar} from "react-native-paper";
import {Text, StyleSheet, Image} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

interface HeaderProps{
    navigation: any,
    previous: any
}

const Header = ({ navigation, previous } : HeaderProps) =>{

    const colorScheme = useColorScheme();

    return(
    <Appbar.Header style={{backgroundColor: Colors[colorScheme].foreground , flexDirection: "row", alignItems:"center", justifyContent: "center"}}>
        {previous ? <Appbar.BackAction style={styles.left} onPress={navigation.goBack} /> : null}
        <Image
            source={require('../assets/images/logo-text.png')}
            style={{ width: 55 , height: 36, paddingStart: -5 }}
        />

    </Appbar.Header>
    );
};

export default Header;

const styles = StyleSheet.create({
    left: {
        position: 'absolute',
        left: 0
    },
});