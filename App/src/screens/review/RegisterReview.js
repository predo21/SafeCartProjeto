import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useContext, useState } from 'react';
import api from '../../api'
import Logo2 from '../../../assets/images/Logo2.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Context } from "../../context/authContext";


const RegisterReview = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [idUser, setidUser] = useState(state.idUser);
    const [idRestaurant, setidRestaurant] = useState(state.idRestaurant);
    const [comment, setComment] = useState('');


    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/review/register", {
                idUser: idUser,
                idRestaurant: idRestaurant,
                comment: comment,
                
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setComment("")
                
                dispatch({type: "update", payload: true})
            }
            else {
                console.log(authData.data.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.view}>
            <Image
                source={Logo2}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <CustomInput
                value={state.nameRestaurant}
                editable={false}
            />

            <CustomInput
                value={state.name}
                editable={false}
            />

            <CustomInput
                placeholder="Adicionar produto"
                value={comment}
                setValue={setComment}
            />

            

            <CustomButton text="Enviar" onPress={onRegisterPressed} />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex:1,
        alignItems: 'center',
        padding: 20,
        backgroundColor:"#212121",
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    loginText: {
        fontWeight: "bold",
        color: "#6200ee",
    },
   
    
    
});

export default RegisterReview