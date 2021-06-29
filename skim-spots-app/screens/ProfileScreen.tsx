import * as React from "react";
import {Image, StyleSheet} from "react-native";
import {Text, View, Button, ScrollView} from "../components/Themed";
import { AuthContext } from "../context/AuthContext";
import Layout from "../constants/Layout";
import UserPoints from "../types/UserPoints";
import {getUserPoints} from "../api/getUserPoints";
import {getUserPointsByUserID} from "../api/getUserPointsByUserID";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import {getPlaceComments} from "../api/getPlaceComments";
import {ThemeContext} from "../context/ThemeContext";

const ProfileScreen = ({navigation} : any) => {

    const [userPoints, setUserPoints] = React.useState<UserPoints>(null);
    const [ranking, setRanking] = React.useState<UserPoints[]>([]);
    const [position, setPosition] = React.useState(0);
    const [text, setText] = React.useState("");


    const { theme } = React.useContext(ThemeContext);

    const { logout} = React.useContext(AuthContext);
    const { user } = React.useContext(AuthContext);

/*    React.useEffect(() => {
        getUserPointsByUserID(user!!.id).then(r => {
            setUserPoints(r);
        });
        getUserPoints().then(r => {
            setRanking(r);
        })
    },[])*/

    React.useEffect(() => {
            if(userPoints!=null){
                const tmp: number = userPoints.amount;
                if( tmp >= 0 && tmp <= 500 ){
                    setText("Poszukaj trochę wiecej.");
                }
                else if (tmp > 500 && tmp <= 1000){
                    setText("Nawet spoko.");
                }
                else if (tmp > 1000){
                    setText("Koxsem jesteś, nie zmieniaj się!");
                }
            }
    },[userPoints])


    React.useEffect(() => { //TODO: IMO NOT VERY GOOD SOLUTION, MAYBE THINK ABOUT OTHER.
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            getUserPointsByUserID(user!!.id).then(r => {
                setUserPoints(r);
            });
            getUserPoints().then(r => {
                setRanking(r);
            });
        });
    }, [navigation]);


    React.useEffect(() => {
        if(ranking!=null){
            for (let u of ranking){
                if(u!!.userId == user!!.id){
                     setPosition(ranking.indexOf(u) + 1);
                }
            }
        }
    },[ranking])

    const onLogoutPressed = () => {
          logout();
    };

  return (
    <ScrollView style={{flex: 1}}  contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cześć {user!!.name}!</Text>
      <Text style={{fontSize: 20, marginTop: 10}} >Zgromadziłeś:</Text>
      <View style={styles.centeredContent}>
        <Image
            source={ theme == "dark"
                        ? require("../assets/images/logo-white.png")
                        : require("../assets/images/logo-dark.png")
            }
            resizeMethod="resize"
            resizeMode="contain"
            style={[{width: 30, height: 50, marginTop: 20}]}
        />
          {userPoints!=null &&
          <Text  style={{fontFamily: "OpenSans-Bold", color: Colors[theme].secondaryText, marginTop: 5, fontSize: 22 }}>
              {userPoints!!.amount} pkt
          </Text>
          }
          <Text style={{marginTop: 10, fontSize: 22 }}>
              {text}
          </Text>

          <Text style={{marginTop: '27%', fontSize: 25}}>Jesteś:</Text>
          {position!=0 && <Text style={[{color: Colors[theme].secondaryText}, styles.position]}>{position}</Text> }
          <Text style={{marginTop: 25, fontSize: 25}}>w rankingu SKIM SPOTS!</Text>

          <Button style={{marginTop: '10%'}}
                  onPress={() => navigation.navigate("RankingScreen", {ranking: ranking})}
          >Zobacz tablicę wyników!</Button>

          <Button style={{marginTop: '5%'}}
                  onPress={() => navigation.navigate("VisitedPlacesScreen")}
          >Zobacz odwiedzone miejsca</Button>
      </View>
      <Button style={{marginTop: 20}} onPress={onLogoutPressed}>Log out</Button>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  centeredContent:{
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent:"center",
      alignItems:"center"
  },
  title: {
    fontSize: 30,
  },
    position:{
      marginTop: 25,
      fontSize: 150,
      fontFamily: "OpenSans-Regular"
    }
});
