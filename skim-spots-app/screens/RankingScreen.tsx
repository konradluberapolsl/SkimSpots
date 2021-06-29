import * as React from "react";
import {
    FlatList,
    StyleSheet,
    Image, SafeAreaView
} from "react-native";
import { 
    getUserPoints } from "../api/getUserPoints";
import { 
    Text, 
    View } from "../components/Themed";
import { 
    AuthContext } from "../context/AuthContext";
import UserPoints from "../types/UserPoints";
import RankingScreenItem from "../components/RankingScreenItem";
import {getUserPointsByUserID} from "../api/getUserPointsByUserID";

interface OwnProps{
    route: any,
    navigation: any
}

const RankingScreen = (props: OwnProps) => {

    const { user } = React.useContext(AuthContext);
    const [ranking, setRanking] = React.useState<UserPoints[]>([]);


    React.useEffect(() => { //TODO: IMO NOT VERY GOOD SOLUTION, MAYBE THINK ABOUT OTHER.
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            getUserPoints().then(r => {
                setRanking(r);
            })
        });
    }, [props.navigation]);


    React.useEffect(() => {

    },[])

    const renderItem = ( {item} : any ) => (
        <RankingScreenItem
            userPoints={item} />
    );

    return(
        <SafeAreaView style={{flex: 1, }}>
        <View style={{ flex: 1 }} >
          <FlatList
              contentContainerStyle={{paddingVertical: 10}}
              data={ranking}
              keyExtractor={item => item!!.id.toString()}
              renderItem={renderItem}/>
        </View>
        </SafeAreaView>
    );
}

export default RankingScreen;

const styles = StyleSheet.create({

    }
   );
