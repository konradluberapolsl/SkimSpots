import React from "react";
import {Appbar} from "react-native-paper";
import {StyleSheet, Image} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import PlaceComment from "../types/Comment";
import {View, Text} from "./Themed";

interface CommentItemProps{
    comment: PlaceComment,
    style: any
}

const CommentItem = ({ comment, style } : CommentItemProps) =>{

    const colorScheme = useColorScheme();

    return(
    <View style={[style, styles.container]}>
        <Image
            source={ colorScheme=="dark" ? require('../assets/images/avatar-light.png'): require('../assets/images/avatar-dark.png')}
            style={[{ width: 26 , height: 36 }]}
        />
        <Text style={styles.userName}>{comment!!.user!!.name}</Text>
        <View style={[{backgroundColor: Colors[colorScheme].foreground}, styles.commentContainer]}>
            <Text lightColor={Colors[colorScheme].secondaryText} >{comment!!.content}</Text>
        </View>
    </View>
    );
};


export default CommentItem;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
        alignItems: "center"
    },
    userName:{
        fontSize: 15,
        marginStart: 10
    },
    commentContainer:{
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 10,
        marginStart: 20,
        width: '75%'
    }
})