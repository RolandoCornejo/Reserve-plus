import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { Alert, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Scrollview, ScrollView, TextInput, Button, FlatList, TouchableHighlightBase, ActivityIndicator } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config'
import auth from '../firebase'
import { Icon } from 'react-native-elements'
import firebase from '../firebase'

const HomeScreen = () => {


    const handleSignOut = () => {
        if (Platform.OS == 'ios' | Platform.OS == 'android')
            Alert.alert('Cerrar Sesión', '¿Está seguro de cerrar sesión?', [{ text: 'Aceptar', onPress: signOutProcess }, { text: 'Cancelar', onPress: () => { console.log('calcelando...') } }])
        else {
            signOutProcess();
        }
    }

    const signOutProcess = () => {
        firebase.auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const [restaurantes,setRestaurantes]=useState([]);
    const [loading,setLoading]=useState(true)

    const promociones = [{ title: '2x1', description: 'Dos por el precio de uno' }, { title: '3x2', description: 'Tres por el precio de dos' }, { title: '30% off', description: '30% de descuento en todos los departamentos' },]
     //[{ key: 1, name: 'Altamar',color:'rgba(168, 234, 244, 0.51)', bg: 'https://images.pexels.com/photos/2410602/pexels-photo-2410602.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }, { key: 2, name: 'A la pasta',color:'rgba(244, 239, 168, 0.51)', bg: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }, { key: 3, name: 'Fiesta Mexicana',color:'rgba(170, 244, 168, 0.51)', bg: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }, { key: 4, name: 'Pupuseria Monica',color:'rgba(168, 202, 244, 0.51)', bg: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },{ key: 1, name: 'Altamar',color:'rgba(168, 234, 244, 0.51)', bg: 'https://images.pexels.com/photos/2410602/pexels-photo-2410602.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }, { key: 2, name: 'A la pasta',color:'rgba(244, 239, 168, 0.51)', bg: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }, { key: 3, name: 'Fiesta Mexicana',color:'rgba(170, 244, 168, 0.51)', bg: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }, { key: 4, name: 'Pupuseria Monica',color:'rgba(168, 202, 244, 0.51)', bg: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },]

        const loadContent= async()=>{
            await firebase.db.collection('restaurantes').onSnapshot(querySnapshot => {
                const restaurantes = []
                querySnapshot.docs.forEach(docs=>{
                    const {nombre,color}=docs.data()
                    restaurantes.push({key:docs.id,nombre,color})
                })
                setRestaurantes(restaurantes)
                console.log(restaurantes)
                setLoading(false)
            })
        }

    const navigation = useNavigation()
    const Item = () => { }
    useEffect(()=>{
        loadContent();
    },[])

    if(loading){
        return <View style={{flex:1,alignItems:'center',alignContent:'center'}}><ActivityIndicator/></View>
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 5, backgroundColor: '#FE2746', alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', textAlign: 'center', }}><Text style={{ color: 'white' }}>Bienvenido</Text><Text style={{ color: 'white' }}>{auth.currentUser?.email}</Text></View>
                <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%' }}>
                <BackgroundImage source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} style={{ width: '100%', height: '75%',marginBottom:15 }}>
                    <View style={{ width: '100%', height: '75%', backgroundColor: 'rgba(24, 50, 89, 0.5)',marginBottom:15 }}>
                        <Text style={{ position: 'relative',marginBottom:15, left: '5%', top: '40%', color: 'white', fontWeight: 'bold', fontSize: 50 }}>¿Qué se te antoja ordenar hoy?</Text>
                    </View>
                </BackgroundImage>
                <View style={{ flex: 1, flexDirection: 'row', height: 50, maxWidth: 800, minWidth: 400, marginHorizontal: 'auto', backgroundColor: 'white', borderRadius: 30, alignItems: 'center', padding: 20, position: 'relative', button: '40%', elevation: 15, shadowColor: 'black' }}>
                    <Icon style={{ flex: 1 }} name='magnifying-glass' type='entypo' />
                    <TextInput style={{ flex: 11, padding: 5 }} placeholder='Comida china' />
                </View>
            </View>
            <View style={{marginVertical: 5 }}>
                <Text style={styles.title}>Promociones</Text>
                    <View>
                        <FlatList horizontal data={promociones} renderItem={({ item }) => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 20, height: 5,margin:5, backgroundColor: 'lightgray', marginLeft: 10, padding: 25, borderRadius: 10 }}><Text>{item.title}</Text></View>} />
                        </View>
                <Text style={styles.title}>Restaurantes</Text>
                <View style={{maxWidth:1000,marginHorizontal:'auto'}}>
               <FlatList data={restaurantes}
                style={{flex:1,flexWrap:'wrap',flexDirection:'row',}}
                numColumns={3}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{width:250,height:250,borderRadius: 20,margin:10,maxWidth:500,maxHeight:500 }} onPress={()=>navigation.navigate('Restaurant',{restauranteId:item.key})}>
                            {/*<BackgroundImage source={{uri:item.bg}} imageStyle={{ borderRadius: 20}} style={{ borderRadius: 20,width: '100%', height: '100%', }}>*/}
                            <View style={{width:'100%',height:'100%', borderRadius: 20,backgroundColor:item.color,flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={{fontWeight:'bold',fontSize:25}}>{item.nombre}</Text>
                            </View>
                            {/*</BackgroundImage>*/}
                        </TouchableOpacity>} 
                        style={{height:'100%'}}
                            />
                    </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {

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
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textHighlight: {
        color: '#FE2746'
    },
    title: {
        fontSize:20,
        fontWeight: 'bold',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
        padding:5
    }

})
