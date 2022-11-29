import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import Cadastrese from '../../assets/images/Cadastrese.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import {Picker} from '@react-native-picker/picker';
import { withSafeAreaInsets } from "react-native-safe-area-context";

const RegisterUser = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const data = await api.post('/user/register', {
                name: name,
                email: email,
                password: password,
                admin: admin
            });
            if (data.status === 200) {
                console.log(data)
                alert(data.data.message)
                navigation.navigate('Login')
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.view}>
            <Image
                source={Cadastrese}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <CustomInput
                placeholder="Nome Completo"
                value={name}
                setValue={setName}
            />

            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />

            <CustomInput
                placeholder="Senha"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
   
            <Picker
                selectedValue={admin}
                style={styles.picker}
                onValueChange={setAdmin}
            >
                <Picker.Item label="Usuário Admin" value="true" />
                <Picker.Item label="Usuário Comum" value="false" />
            </Picker>

            <CustomButton text="Register" onPress={onRegisterPressed} />
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.entrartext}>
                    Já tem uma conta?{" "}
                    <Text style={styles.loginText}>Faça o login</Text>
                </Text>
            </TouchableOpacity>
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
    entrartext:{
        color:"white",

    },


    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    loginText: {
        fontWeight: "bold",
        color: "#a575bc",
    },
    picker: {
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#a468bc',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        borderWidth: 0,
        height: 45,
        fontWeight:"bold",
        color:"white",
        width: '100%',
    },
   



});

export default RegisterUser;