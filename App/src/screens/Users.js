import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import api from '../api'
import Stars from 'react-native-stars';
import { Entypo } from "@expo/vector-icons";

const Users = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)

    const [reviews, setReviews] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/review/findByUser', {
                params: {
                    idUser: state.idUser,
                  }
            });
            console.log(list);
            setReviews(list.data.reviews)
            dispatch({type: "update", payload: false})
        }
        onScreenLoad();
    }, [state.update]
    )

    return (
        <View style={styles.view}>
            <FlatList
                data={reviews}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <View style={styles.text}>
                                <Text style={styles.item}>{item.restaurant.name}</Text>
                                <Text style={styles.title}>{item.comment}</Text>
                                <Stars
                                    count={5}
                                    display={item.stars}
                                    half={false}
                                    starSize={50}
                                    fullStar={<Entypo name='star' style={[styles.myStarStyle]} />}
                                    halfStar={<Entypo name='star' style={[styles.myStarStyle]} />}
                                    emptyStar={<Entypo name='star-outlined' style={[styles.myEmptyStarStyle]} />}
                                />
                            </View>
                        </View>
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
        </View>


    )
}

export default Users

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    text: {
        height: 120,
        width: '100%',
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        margin: 5,
        textAlign: 'center'
    },
    item: {
        margin: 5,
        fontSize: 15
    },
    icon: {
        margin: 10
    },
    myStarStyle: {
        color: 'orange',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        width: 50,
        fontSize: 50
    },
    myEmptyStarStyle: {
        color: 'gray',
        width: 50,
        fontSize: 50
    }
})
