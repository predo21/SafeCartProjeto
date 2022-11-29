import { View, Text, StyleSheet, Button, } from 'react-native'
import React, { useContext, useState } from 'react'
import { Context } from '../context/authContext'
import CustomButton from '../components/CustomButton';



const Home = ({ navigation }) => {

  const { state, dispatch } = useContext(Context);

  return (
   
    <View style={styles.container}>
      
      <Text style={styles.text}>Bem-vindo {state.name}</Text>
     
      <CustomButton text="Listas" onPress={() => navigation.navigate("Listas")} />
      <CustomButton style={styles.Botao1} text="Entrar em uma lista" onPress={() => navigation.navigate("Reviews")} />
      {/* <CustomButton text="Users" onPress={() => navigation.navigate("Users")} /> */}
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'space-around',
    backgroundColor:"#212121"
    
  },

  text: {
    fontSize: 30,
    color: "#a468bc",
    fontWeight: "bold",
    margin: 40
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
},


})

export default Home;