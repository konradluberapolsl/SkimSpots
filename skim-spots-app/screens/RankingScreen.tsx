import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import UserPoints from "../types/UserPoints";


interface RankingScreenProps{
    ranking: UserPoints[],
}

interface OwnProps{
    route: any,
    navigation: any
}


const RankingScreen = (props: OwnProps) => {

    const { ranking }: RankingScreenProps = props.route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ranking</Text>
        </View>
    );
};

export default RankingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
