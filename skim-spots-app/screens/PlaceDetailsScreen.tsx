import React from "react";
import { Button, ScrollView, Text, View } from "../components/Themed";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
// @ts-ignore
import { SliderBox } from "react-native-image-slider-box";
import Place from "../types/Place";
import { Image } from "react-native-elements";
import Colors from "../constants/Colors";
import { getPlaceComments } from "../api/getPlaceComments";
import PlaceComment from "../types/Comment";
import CommentItem from "../components/CommentItem";
import OwnComment from "../components/OwnComment";
import { AuthContext } from "../context/AuthContext";
import { postUserComment } from "../api/postUserComment";
import { ThemeContext } from "../context/ThemeContext";

interface PlaceDetailsScreenProps {
  place: Place;
}

interface OwnProps {
  route: any;
  navigation: any;
}

const PlaceDetailsScreen = (props: OwnProps) => {
  const { place }: PlaceDetailsScreenProps = props.route.params;
  const { theme } = React.useContext(ThemeContext);
  const { REACT_APP_TEST_KEY } = process.env;

  const secondaryTextColor = Colors["light"].secondaryText;
  const foregroundColor = Colors["light"].foreground;

  const yourLocalIP: string =
    REACT_APP_TEST_KEY !== undefined ? REACT_APP_TEST_KEY : "192.168.1.88";

  const [comments, setComments] = React.useState<PlaceComment[]>([]);
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [commentsReady, setCommentsReady] = React.useState(false);
  const [text, onTextChange] = React.useState("");
  const [postCommentVisibility, setPostCommentVisibility] =
    React.useState(false);
  const [width, setWidth] = React.useState<any>();

  const numberOfCommentsToShow = 3;
  const { user } = React.useContext(AuthContext);

  const setPhotosURLs = () => {
    let tmp = [];
    for (let i = 1; i <= place!!.numberOfImages; i++) {
      tmp.push(`http://${yourLocalIP}:8000${place!!.pathToImages}${i}.jpg`);
    }
    setPhotos(tmp);
  };

  const onPostCommentButtonClicked = () => {
    postUserComment(place!!.id, user!!, text).then((r) => {
      setComments((oldArray) => [r, ...oldArray]);
      onTextChange("");
    });
  };

  React.useEffect(() => {
    //TODO: IMO NOT VERY GOOD SOLUTION, MAYBE THINK ABOUT OTHER.
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return props.navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      getPlaceComments(place!!.id).then((res) => {
        if (res.length != 0) setComments(res);
      });
    });
  }, [props.navigation]);

  React.useEffect(() => {
    setPhotosURLs();
  }, []);

  const onLayout = (e: any) => {
    setWidth(e.nativeEvent.layout.width - 60);
  };

  React.useEffect(() => {
    if (comments.length != 0) {
      setCommentsReady(true);
    }
  }, [comments]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onLayout={onLayout}
      >
        <View style={styles.topContent}>
          <Image
            source={
              theme == "light"
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
        <Text style={{ fontSize: 25, marginTop: 5, marginBottom: 30 }}>
          {place!!.estimatedLocalization}
        </Text>

        <SliderBox
          images={photos}
          resizeMethod="scale"
          sliderBoxHeight={300}
          paginationBoxVerticalPadding={10}
          ImageComponentStyle={[
            {
              borderRadius: 15,
              width: "100%",
              borderColor: Colors[theme].text,
              borderWidth: 1,
            },
          ]}
          dotStyle={{
            width: 12,
            height: 12,
            borderRadius: 15,
          }}
          dotColor={Colors[theme].foreground}
          imageLoadingColor={Colors[theme].foreground}
          inactiveDotColor={"#575757"}
          circleLoop
          parentWidth={width}
        />

        <Text style={{ fontSize: 20, marginTop: 25 }}>
          {place!!.information}
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            fontFamily: "OpenSans-LightItalic",
          }}
        >
          Dodane przez: {place!!.author!!.name}
        </Text>
        {commentsReady
          ? comments!!
              .slice(0, numberOfCommentsToShow)
              .map((comment, index) => {
                return (
                  <CommentItem
                    style={styles.commentsContainer}
                    key={index}
                    comment={comment}
                  />
                );
              })
          : comments.length != 0 && (
              <ActivityIndicator size="large" color={foregroundColor} />
            )}

        <OwnComment
          text={text}
          onChaneText={onTextChange}
          userName={user!!.name}
          style={styles.commentsContainer}
        />
        {text != "" && (
          <Button
            style={styles.button}
            onPress={onPostCommentButtonClicked}
            uppercase={false}
          >
            Zostaw komentarz
          </Button>
        )}
        {comments.length > numberOfCommentsToShow && text == "" && (
          <Button
            style={styles.button}
            uppercase={false}
            onPress={() =>
              props.navigation.navigate("AllPlaceCommentsScreen", {
                place: place!!,
                comments: comments!!,
              })
            }
          >
            Zobacz wszystkie komentarze!
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceDetailsScreen;

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
