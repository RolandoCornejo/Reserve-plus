import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, FlatList, Platform, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import firebase from '../firebase'
import { ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import RandExp from "randexp";

export default function RestaurantScreen(props) {
  const navigation = useNavigation()
  const { restauranteId } = props.route.params

  const [restaurante, setRestaurante] = useState({});
  const [loading, setLoading] = useState(true)

  const [total, setTotal] = useState(0);
  const [menu, setMenu] = useState([]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const onChange = (event, seletedDate) => {
    const currentDate = seletedDate || date
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setText(fDate + ' ' + fTime);
    console.log(fDate + ' (' + fTime + ')')
  }

  //Obtiene el resstaurante
  const getRestaurantById = async (id) => {
    const ref = firebase.db.collection('restaurantes').doc(id);
    const doc = await (await ref.get()).data()
    setRestaurante(doc)
    navigation.setOptions({
      title: doc.nombre, headerStyle: {
        backgroundColor: doc.color,
      },
    })
    setLoading(false)
  }

  //Calcula el total de la orden
  const calcularTotal = async () => {
    let newTotal = 0;
    await restaurante.menu.forEach(element => {
      if (element.cantidad > 0) {
        newTotal += (element.precio * element.cantidad);
        console.log(newTotal)
      }
    });
    setTotal(newTotal.toFixed(2));
  }
  //Envia la orden a la base de datos
  const calcularOrden = async () => {

    const user = await AsyncStorage.getItem('@userId')
    //Detalles de cliente y restaurante
    let detalles = { restaurante: restauranteId, usuario: user, total: 0,fecha:new Date() }

    let newOrden = restaurante.menu.filter((item) => {
      return (item.cantidad > 0)
    })

    restaurante.menu.forEach(element => {
      if (element.cantidad > 0) {
        detalles.total += (element.precio * element.cantidad).toFixed(2);
      }
    });
    let final = { detalles, orden: newOrden }

    console.log(final);
    let codigo=new RandExp(/^[A-Z]{3}-[0-9]{3}/).gen();
    console.log(codigo) 
    while( !firebase.db.collection('usuarios').doc(codigo).get()){
      let codigo=new RandExp(/^[A-Z]{3}-[0-9]{3}/).gen();
    console.log(codigo) 
    }
    try{
      firebase.db.collection('reservaciones').doc(codigo).set(final).then((docref)=>{
        alert('Muestra el siguiente codigo al llegar al restaurante NO LO PIERDAS')
        alert(codigo)
      })
    }catch(e){
      console.log(e);
    }
    
  }

  useEffect(() => {
    getRestaurantById(restauranteId);

  }, [])

  if (loading) {
    return <View style={{ flex: 1, alignItems: 'center', alignContent: 'center' }}><ActivityIndicator /></View>
  }

  return (
    <View style={{ maxWidth: 2000, marginHorizontal: 'auto' }}>
      <Button
        onPress={() => { showMode('date') }}
        title='Seleccionar fecha'
      />
      <Button
        onPress={() => { showMode('time') }}
        title='Seleccionar hora'
      />

      {show && (
        <DateTimePicker
        testID='Datetime'
        value={date}
        mode={mode}
        is24Hour={false}
        display='default'
        onChange={onchange}/>
      )}

      <Text>{text}</Text>
      <Text>MENÚ</Text>
      {
        restaurante.menu.map((item, i) => (
          <ListItem key={i} bottomDivider>

            <ListItem.Content>
              <ListItem.Title>{item.platillo}</ListItem.Title>
              <ListItem.Subtitle>${item.precio}</ListItem.Subtitle>
            </ListItem.Content>

            <Button
              icon={
                <Icon
                  name="minus"
                  size={15}
                  color="white"
                />
              }
              disabled={item.cantidad == 0 ? true : false}
              onPress={() => { item.cantidad--; setMenu([...menu, item]); calcularTotal() }}

            /><Text>{item.cantidad}</Text>
            <Button
              icon={
                <Icon
                  name="plus"
                  size={15}
                  color="white"
                />
              }
              onPress={() => { item.cantidad++; setMenu([...menu, item]); calcularTotal() }}

            />
          </ListItem>
        ))
      }
      <Text>Total: ${total}</Text>
      <Button
        onPress={() => { calcularOrden() }}
        title='Realizar orden'
      />
    </View>
  )
}
