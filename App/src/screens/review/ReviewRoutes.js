import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterReview from './RegisterReview';
import Reviews from './Reviews';

const Stack = createNativeStackNavigator();

const ReviewRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="ReviewsMain" component={Reviews} />
            </Stack.Navigator>
    )
}

export default ReviewRoutes

