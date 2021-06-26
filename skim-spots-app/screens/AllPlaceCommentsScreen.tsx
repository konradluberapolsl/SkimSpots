import React, { useContext } from "react";
import Place from "../types/Place";
import PlaceComment from "../types/Comment";
import { SafeAreaView, StyleSheet } from "react-native";
import { View, ScrollView, Text, Button } from "../components/Themed";
import { Image } from "react-native-elements";
import Colors from "../constants/Colors";
import CommentItem from "../components/CommentItem";
import OwnComment from "../components/OwnComment";
import { AuthContext } from "../context/AuthContext";
import { postUserComment } from "../api/postUserComment";
import { ThemeContext } from "../context/ThemeContext";

interface AllPlaceCommentsScreenProps {
  place: Place;
  comments: PlaceComment[];
  setComments: React.Dispatch<React.SetStateAction<PlaceComment[]>>;
}

interface OwnProps {
  route: any;
  navigation: any;
}

const AllPlaceCommentsScreen = (props: OwnProps) => {
  const { place }: AllPlaceCommentsScreenProps = props.route.params;
  const { comments }: AllPlaceCommentsScreenProps = props.route.params;

  const { user } = React.useContext(AuthContext);

  const [text, onTextChange] = React.useState("");
  const [allComments, setAllComments] = React.useState<PlaceComment[]>([]);

  const onPostCommentPressed = () => {
    postUserComment(place!!.id, user!!, text).then((r) => {
      comments.unshift(r);
      onTextChange("");
    });
  };

  React.useEffect(() => {
    setAllComments(comments);
  }, [comments]);

  const { theme } = useContext(ThemeContext);

  const secondaryTextColor = Colors[theme].secondaryText;
  const foregroundColor = Colors[theme].foreground;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={styles.topContent}>
            <Image
              source={
                theme == "dark"
                  ? require("../assets/images/logo-light.png")
                  : require("../assets/images/logo-dark.png")
              }
              style={[{ width: 40, height: 60, marginBottom: 20 }]}
            />
            <Text style={{ fontSize: 20 }}>{place!!.points} pkt</Text>
          </View>

          <Text style={{ fontSize: 30, color: secondaryTextColor }}>
            {place!!.name}
          </Text>
          <Text style={{ fontSize: 25, marginTop: 5 }}>
            {place!!.estimatedLocalization}
          </Text>
        </View>
        {comments!!.map((comment, index) => {
          return (
            <CommentItem
              style={styles.commentsContainer}
              key={index}
              comment={comment}
            />
          );
        })}

        <OwnComment
          text={text}
          onChaneText={onTextChange}
          userName={user!!.name}
          style={styles.commentsContainer}
        />
        {text != "" && (
          <Button
            style={styles.button}
            onPress={onPostCommentPressed}
            uppercase={false}
          >
            Zostaw komentarz
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllPlaceCommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: "column",
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  topContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  commentsContainer: {
    marginTop: 30,
  },
  button: {
    marginTop: 20,
  },
});
