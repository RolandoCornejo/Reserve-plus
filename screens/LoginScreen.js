import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth, {provider} from '../firebase';
import { Icon } from 'react-native-elements'
const LoginScreen = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user)
                navigation.replace('Home')
        })
        return unsubscribe;
    }, [])


    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log(user.email)
            }).catch(error => {
                error.code == 'auth/weak-password' ? alert('Contraseña muy débil, debe ser de 6 caracteres o más') : error.code == 'auth/email-already-in-use' ? alert('Este usuario ya existe') : error.code == 'auth/invalid-email' ? alert('El correo está mal escrito') : alert(error.message)
            })
    }


    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log('logged with email')
            })
            .catch(error => {
                error.code == 'auth/wrong-password' ? alert('Contraseña incorrecta') : error.code == 'auth/invalid-email' ? alert('El correo está mal escrito') : alert(error.message)
            })
    }

    const handleGoogle = ()=>{
        auth.signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {console.log(error.message)})
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='height'>
            <Text style={styles.title}>Reserve+</Text>
            <View style={styles.inputconntainer}>
                <TextInput placeholder='Correo' value={email} onChangeText={text => setEmail(text.replace('\s+', ''))} style={styles.input} />
                <TextInput placeholder='Contraseña' value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry />
            </View>
            <View style={styles.buttoncontainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutLine]}>
                    <Text style={styles.buttonOutLineText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputconntainer}>
            <TouchableOpacity onPress={handleGoogle} style={[styles.button, styles.buttonOutLine, {marginVertical:15}]}>
                    <Text style={styles.buttonOutLineText}> <Icon name='google' type='antdesign' color='#FE2746'/>   Iniciar con Google</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

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
        fontSize:50,
        marginVertical:10
    }

})
