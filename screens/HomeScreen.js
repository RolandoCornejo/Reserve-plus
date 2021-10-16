import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import auth from '../firebase'

const HomeScreen = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        if(Platform.OS=='ios'|Platform.OS=='android')
        Alert.alert('Cerrar Sesión','¿Está seguro de cerrar sesión?',[{text:'Aceptar',onPress: signOutProcess},{text:'Cancelar',onPress:()=>{console.log('calcelando...')}}])
        else{
            signOutProcess();
        }
    }

    const signOutProcess = () => {
        auth.signOut()
       .then(()=>{
        navigation.replace("Login")})
       .catch((error)=>{
       alert(error.message)})
    }

    return (
        <View style={styles.container}>
            <Text>Bienvenido {auth.currentUser?.email}</Text>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minWidth: 300,
        maxWidth: 1000,
        marginHorizontal: 'auto'
    },
    button: {
        //width: '100%',
        marginTop: 5,
        backgroundColor: '#FE2746',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textHighlight:{
        color:'#FE2746'
    }
})
