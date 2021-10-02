import React, { useContext } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image, TextInput } from "react-native";
import Colors from "../constants/Colors";
import PlaceComment from "../types/Comment";
import { View, Text } from "./Themed";
import { ThemeContext } from "../context/ThemeContext";

interface OwnCommentProps {
  userName: string;
  style: any;
  text: string;
  onChaneText: any;
}

const OwnComment = ({
  userName,
  style,
  text,
  onChaneText,
}: OwnCommentProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[style, styles.container]}>
      <Image
        source={require("../assets/images/avatar-white.png")}
        style={[{ width: 26, height: 36 }]}
      />
      <Text darkColor={Colors[theme].white} style={styles.userName}>
        {userName}
      </Text>
      {/*            <View style={[{backgroundColor: Colors[colorScheme].foreground}, styles.commentContainer]}>
                <Text lightColor={Colors[colorScheme].secondaryText} >asdasda</Text>
            </View>*/}
      <TextInput
        style={[
          {
            backgroundColor: Colors[theme].white,
            color: Colors[theme].foreground,
          },
          styles.commentContainer,
        ]}
        value={text}
        onChangeText={onChaneText}
        placeholder="Zostaw swój komentarz.."
      />
    </View>
  );
};

export default OwnComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 15,
    marginStart: 10,
  },
  commentContainer: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    marginStart: 20,
    width: "75%",
  },
});
