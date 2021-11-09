import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'

export default function SignUpScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_redo,setPassword_redo]=useState('');

    const handleSignUp = () => {
        password!=password_redo?alert('Las contraseñas no coinciden'):

        firebase.auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                firebase.db.collection('usuarios').add({
                    correo:user.email,
                })
                console.log(user.email)
            }).catch(error => {
                error.code == 'auth/weak-password' ? alert('Contraseña muy débil, debe ser de 6 caracteres o más') : error.code == 'auth/email-already-in-use' ? alert('Este usuario ya existe') : error.code == 'auth/invalid-email' ? alert('El correo está mal escrito') : alert(error.message)
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='height'>
            <Text style={styles.title}>Registro</Text>
            <View style={styles.inputconntainer}>
                <TextInput placeholder='Correo' value={email} onChangeText={text => setEmail(text.replace('\s+', ''))} style={styles.input} />
                <TextInput placeholder='Contraseña' value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry />
                <TextInput placeholder='Contraseña-redo' value={password_redo} onChangeText={text => setPassword_redo(text)} style={styles.input} secureTextEntry />
            </View>
            <View style={styles.buttoncontainer}>
                
                <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutLine]}>
                    <Text style={styles.buttonOutLineText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputconntainer: {
        width: '80%',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minWidth: 400,
        maxWidth: 1000,
        marginHorizontal: 'auto'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'lightgray',
        borderWidth: 1
    },
    buttoncontainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        width: '100%',
        backgroundColor: '#FE2746',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonOutLine: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#FE2746',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonOutLineText: { color: '#FE2746', fontWeight: 'bold' },
    title:{
        fontWeight:'bold',
        fontSize:30,
        marginVertical:10
    }
})
