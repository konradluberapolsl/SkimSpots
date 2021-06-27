import * as React from "react";
import {
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,

} from "react-native";
import {Text, View, Button,  ScrollView } from "../components/Themed";
import { AuthContext } from "../context/AuthContext";
import { Input } from 'react-native-elements';
import {Ionicons} from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";



const WelcomeScreen = () => {
    const colorScheme = useColorScheme();

    const [height, setHeight] = React.useState();

    const [text, setText] = React.useState("");

    const { register } = React.useContext(AuthContext);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : "height"}
            style={{flex: 1}}
            contentContainerStyle={{flex: 1}}
        >
        <ScrollView style={{flex:1}} contentContainerStyle={styles.container}>
            <Image
                source={ colorScheme == "dark" ? require("../assets/images/logo-text-icon-dark.png") : require("../assets/images/logo-text-icon-light.png") }
                resizeMethod="auto"
                resizeMode="contain"
                style={{width:"45%", height:"15%", marginTop: '70%'}}
            />

          <Input
              value={text}
              onChangeText={setText}
              containerStyle={styles.inputContainer}
              inputContainerStyle={[{backgroundColor: Colors[colorScheme].foreground, borderRadius: 30, paddingHorizontal: 10  , borderBottomWidth: 0 }]}
              inputStyle={{color: '#FFF'}}
              placeholder='Twój nick..'
              rightIcon={
                <Ionicons name={"pencil"} size={23} color='white'  />
              }
          />

          <Button disabled={text==""}  style={styles.button} onPress={() => register(text)}>GO!</Button>

            <Image
                source={colorScheme == "dark" ? require("../assets/images/waves-dark.png") : require("../assets/images/waves-light.png") }
                resizeMethod="resize"
                resizeMode="contain"
                style={[styles.image, {width:"100%", height: (0.4 * Layout.window.height) }]}
            />
        </ScrollView>
        </KeyboardAvoidingView>

  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button:{
    position: "absolute",
    bottom: 60,
    width: "50%",
  },
  inputContainer:{
      width: "70%",
      color: "#FFF",
      marginTop: 50
  },
  image:{
    position: "absolute",
    bottom: -10,
    zIndex: -1
  }


});
