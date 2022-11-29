import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterRestaurant from './RegisterRestaurant';
import Restaurants from './Restaurants';
import RegisterReview from '../review/RegisterReview';
import RestaurantReviews from '../review/RestaurantReviews';

const Stack = createNativeStackNavigator();

const RestaurantRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="MainRestaurants" component={Restaurants} />
                <Stack.Screen name="RegisterRestaurant" component={RegisterRestaurant} />
                <Stack.Screen name="RegisterReview" component={RegisterReview} />
                <Stack.Screen name="RestaurantReviews" component={RestaurantReviews} />
            </Stack.Navigator>
    )
}

export default RestaurantRoutes

