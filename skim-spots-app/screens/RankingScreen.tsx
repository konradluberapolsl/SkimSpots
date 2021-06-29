import * as React from "react";
import { 
    FlatList, 
    StyleSheet, 
    Image } from "react-native";
import { 
    getUserPoints } from "../api/getUserPoints";
import { 
    Text, 
    View } from "../components/Themed";
import { 
    AuthContext } from "../context/AuthContext";
import UserPoints from "../types/UserPoints";

interface OwnProps{
    route: any,
    navigation: any
}

const RankingScreen = (props: OwnProps) => {

    const { user } = React.useContext(AuthContext);
    const [ranking, setRanking] = React.useState<UserPoints[]>([]);

    const image = 'https://cdn.iconscout.com/icon/free/png-512/account-269-866236.png';

    React.useEffect(() => {
        getUserPoints().then(r => {
            setRanking(r);
        })
    },[])

    return(
        <View style={{ flex: 1 }} >
          <FlatList
          data={ranking}
          horizontal={false}
          keyExtractor={item => item!!.id.toString()}
          renderItem={(post) => {
            const item = post.item;
            return (
                  <View style={styles.row}>
                    <Image style={styles.pic} source={{uri:image}}></Image>
                    <View>
                      <View style={styles.nameContainer}>
                        {item?.user?.id == user?.id &&
                            <Text style={styles.nameTxtActive} numberOfLines={1} ellipsizeMode="tail">{item?.user?.name}</Text>
                        }
                        {item?.user?.id != user?.id &&
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item?.user?.name}</Text>
                        }
                        <Text style={styles.mblTxt}>{item?.amount} pkt</Text>
                      </View>
                    </View>
                  </View>
              );
          }}/>
        </View>
    );
}

export default RankingScreen;

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#DCDCDC',
      borderBottomWidth: 1,
      height: 75,
    },
    pic: {
      borderRadius: 30,
      width: 60,
      height: 60,
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 300,
    },
    nameTxt: {
      marginLeft: 15,
      fontWeight: '600',
      fontSize: 22,
      width:170,
    },
    nameTxtActive: {
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 25,
        width:170,
      },
    mblTxt: {
      fontWeight: '200',
      fontSize: 17,
    },
    msgContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    msgTxt: {
      fontWeight: '400',
      fontSize: 16,
      marginLeft: 15,
    },
  });
