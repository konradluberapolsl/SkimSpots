import * as React from "react";
import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import { Text, View } from "../components/Themed";
import {PlaceContext} from "../context/PlaceContext";
import VisitedPlacesItem from "../components/VisitedPlacesItem";
import UserPlace from "../types/UserPlace";
import {color} from "react-native-elements/dist/helpers";
import Place from "../types/Place";

interface OwnProps{
    route: any,
    navigation: any
}


const VisitedPlacesScreen = (props: OwnProps) => {

    const handleOnPressItem = (place : Place) => {
        props.navigation.navigate("PlaceDetailsScreen", { place: place!! });
    }

    const { userPlaces } = React.useContext(PlaceContext);

    const renderItem = ( {item} : any ) => (
        <VisitedPlacesItem
            place={item.place}
            onPress={() => handleOnPressItem(item.place)} />
    );

    console.log(userPlaces);


    return (
        <SafeAreaView style={{flex: 1, }}>
            <View style={styles.container}>
                <Text style={styles.title}>Oto miejsca które udało Ci się odwiedzić:</Text>
                <FlatList
                    data={userPlaces}
                    renderItem={renderItem}
                    keyExtractor={item => item!!.id.toString()}
                />
            </View>
        </SafeAreaView>
    );
};

export default VisitedPlacesScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    title: {
        marginVertical: 15,
        fontSize: 20,
        fontFamily: "OpenSans-Light",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
