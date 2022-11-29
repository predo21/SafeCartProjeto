import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useState, useContext } from 'react';
import Logo2 from '../../../assets/images/Logo2.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import api from '../../api'
import { Context } from '../../context/authContext'
import {Picker} from '@react-native-picker/picker';

const RegisterRestaurant = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [name, setName] = useState('');
   
    const [description, setDescription] = useState('');
   

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/restaurant/register", {
                name: name,
                description: description,
                
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setName("")
                
                setDescription("")
                
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
                placeholder="Nome da lista"
                value={name}
                setValue={setName}
            />


            <CustomInput
                placeholder="Descrição da lista"
                value={description}
                setValue={setDescription}
            />



            <CustomButton text="Registrar" onPress={onRegisterPressed} />
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
    picker: {
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        borderWidth: 0,
        height: 45,
        width: '100%'
    },


    button:{
        backgroundColor: '#3b71f3',
        width: '100%',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        fontWeight: "bold",

        textTransform: 'none',
        backgroundColor: "#a468bc",
        

    },
});

export default RegisterRestaurant