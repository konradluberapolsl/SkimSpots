import React, { useContext } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image, Pressable, TouchableOpacity, View as DefaultView } from "react-native";
import Colors from "../constants/Colors";
import PremiumPlace from "../types/PremiumPlace";
import { View, Text } from "./Themed";
import { ThemeContext } from "../context/ThemeContext";
import Layout from "../constants/Layout";
import UserPoints from "../types/UserPoints";
import {AuthContext} from "../context/AuthContext";

interface RankingScreenItemProps {
     userPoints : UserPoints;
}

const RankingScreenItem = ({ userPoints }: RankingScreenItemProps) => {

    const { REACT_APP_TEST_KEY } = process.env;
    const yourLocalIP: string =
        REACT_APP_TEST_KEY !== undefined ? REACT_APP_TEST_KEY : "192.168.0.80";

    const { theme } = React.useContext(ThemeContext);
    const { user } = React.useContext(AuthContext);
    const [blur, setBlur] = React.useState(0);
    const [isUser, setUser] = React.useState(false);
    const [image, setImage] = React.useState("../assets/images/avatar-white.png");

    React.useEffect(() => {
        if(userPoints!!.userId == user!!.id)
            setUser(true);
        else
            setUser(false);

    }, []);


    React.useEffect(() => {
        if(isUser)
            setImage("../assets/images/avatar-white.png")
        else{
            if (theme == "dark")
                setImage("../assets/images/avatar-light.png")
            else
                setImage("../assets/images/avatar-dark.png")
        }
    }, [user]);

    const imageSelector = () => {
        if(isUser)
            return ("../assets/images/avatar-white.png")
        else{
            if (theme == "dark")
                return ("../assets/images/avatar-light.png")
            else
                return ("../assets/images/avatar-dark.png")
        }
    }


    return (
        <View style={[styles.row, {backgroundColor: isUser ? (
              theme == "dark" ? Colors[theme].foreground : Colors["dark"].background
            ) : Colors[theme].background,
            borderColor: theme == "dark" ? Colors[theme].white : Colors[theme].text

                }]}>
            {isUser &&
            <Image
                style={styles.pic}
                resizeMethod="resize"
                resizeMode="contain"
                source={require("../assets/images/avatar-white.png")}/> }
            {!isUser &&
            <Image
                style={styles.pic}
                resizeMethod="resize"
                resizeMode="contain"
                source={
                    theme == "dark" ? require("../assets/images/avatar-light.png")
                        : require("../assets/images/avatar-dark.png")
            }/> }

            <Text style={[styles.name, {color: isUser ? Colors[theme].white : Colors[theme].text}]}>{userPoints!!.user!!.name}</Text>

            <Text style={[styles.amount, {color: isUser ? Colors[theme].white : Colors[theme].text} ]}>{userPoints!!.amount} pkt</Text>

        </View>
    );
};

export default RankingScreenItem

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderBottomWidth: 1
    },
    pic: {
        marginStart: 5,
        width: 25,
        height: 40,
    },
    nameContainer: {
        flexDirection: 'row',
    },
    name: {
        marginLeft: 15,
        fontFamily: "OpenSans-Light",
        fontSize: 22,
    },
    amount:{
        marginLeft: "auto",
        marginRight: 20,
        fontFamily: "OpenSans-Regular",
        fontSize: 22,
    }
});