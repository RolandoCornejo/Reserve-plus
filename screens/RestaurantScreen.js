import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import firebase from '../firebase'

export default function RestaurantScreen(props) {
    const navigation = useNavigation()
    const {restauranteId}=props.route.params

    const [restaurante,setRestaurante]=useState({});
    const [loading,setLoading]=useState(true)

    const getRestaurantById=async (id)=>{
        const ref = firebase.db.collection('restaurantes').doc(id);
        const doc = await (await ref.get()).data()
        navigation.setOptions({title:doc.nombre,headerStyle: {
            backgroundColor: doc.color,
          },})
        console.log(doc)
        setRestaurante(doc)
        setLoading(false)
    }

    useEffect(async()=>{
        getRestaurantById(restauranteId);
    },[])   

    if(loading){
        return <View style={{flex:1,alignItems:'center',alignContent:'center'}}><ActivityIndicator/></View>
    }

    return (
        <View>
            <Text>This is the page for the {restaurante.nombre} Restaurant</Text>
        </View>
    )
}
