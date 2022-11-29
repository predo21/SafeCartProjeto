import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'

import { Entypo } from "@expo/vector-icons";

const RestaurantReviews = ({ navigation }) => {

    const { state } = useContext(Context)

    const [reviews, setReviews] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/review/findByRestaurant', {
                params: {
                    idRestaurant: state.idRestaurant,
                },
            }).then((res) => setReviews(res.data.reviews))
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
                                <Text style={styles.title}>{item.comment}</Text>
                               
                                <Text style={styles.item}>Adicionado por: {item.user.name}</Text>
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

export default RestaurantReviews

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:"#212121",
        
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#a575bc',
        alignItems: 'center',
        
    },
    text: {
        height: 120,
        width: '100%',
        color:"white",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        margin: 10,
        color:"white",
        fontWeight:"bold",
        textAlign: 'center'
    },
    item: {
        margin: 10,
        fontSize: 15,
        color:"white",
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
