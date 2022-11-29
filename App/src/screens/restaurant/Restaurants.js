import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'
import { Entypo } from '@expo/vector-icons'
import CustomButton from '../../components/CustomButton'

const Restaurants = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)

    const [restaurants, setRestaurants] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/restaurant/find');
            setRestaurants(list.data.restaurants)
            dispatch({type: "update", payload: false})
        }
        onScreenLoad();
    }, [state.update]
    )

    const seeReview = async (item) => {
        await dispatch({type: 'setRestaurant', payload: item});
        navigation.navigate('RestaurantReviews');
    }

    const newReview = async (item) => {
        await dispatch({type: 'setRestaurant', payload: item});
        navigation.navigate('RegisterReview')
    }

    return (
        <View style={styles.view}>
            {state.isAdmin ? (
                <CustomButton text="Nova Lista" onPress={() => navigation.navigate("RegisterRestaurant")} />
            ) : (
                <></>
            )}
            <FlatList
                data={restaurants}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.text} onPress={() => seeReview(item)}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <Text style={styles.item}>{item.type}</Text>
                                    <Text style={styles.item}>{item.description}</Text>
                                    <Text style={styles.item}>{item.address}</Text>
                            </TouchableOpacity>
                            <Entypo
                                name="squared-plus"
                                size={60}
                                color="white"
                                style={styles.icon}
                                onPress={() => newReview(item)}
                            />
                        </View>
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
        </View>


    )
}

export default Restaurants

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
        backgroundColor: '#a468bc',
        alignItems: 'center',
    },
    text: {
        height: 120,
        width: '80%',
        justifyContent: "center",
        color:"white"
    },
    title: {
        fontSize: 30,
        color:"white"
    },
    item: {
        fontSize: 15,
        color:"white"
    },
    icon: {
        margin: 0
    }
})
