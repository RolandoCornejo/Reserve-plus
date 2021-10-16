import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback,
Keyboard, Platform, Image} from 'react-native';
import Reservacion from './componentes/Reservacion';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './src/utils/colors';
import logo from './assets/logo.png'; 



const App = () => {
// definir el state de citas
const [reservaciones, setReservaciones] = useState([]);
const [mostrarform, guardarMostrarForm] = useState(false);
useEffect(() => {
const obtenerReservacionesStorage = async () => {
try {
const reservacionesStorage = await AsyncStorage.getItem('reservaciones');
if(reservacionesStorage) {
setReservaciones(JSON.parse(reservacionesStorage))
}
} catch (error) {
console.log(error);
}
}
obtenerReservacionesStorage();
}, []);

// Elimina los pacientes del state
const eliminarCliente = id => {
const reservacionesFiltradas = reservaciones.filter( reservacion => reservacion.id !== id );
setReservaciones( reservacionesFiltradas );
guardarReservacionesStorage(JSON.stringify(reservacionesFiltradas));
}
// Muestra u oculta el Formulario
const mostrarFormulario = () => {
guardarMostrarForm(!mostrarform);
}
// Ocultar el teclado
const cerrarTeclado = () => {
Keyboard.dismiss();
}
// Almacenar las citas en storage

const guardarReservacionesStorage = async (reservacionesJSON) => {
try {
await AsyncStorage.setItem('reservaciones', reservacionesJSON);
} catch (error) {
console.log(error);
}
}
return (



<TouchableWithoutFeedback onPress={() => cerrarTeclado() }>

<View style={styles.contenedor}>
<Text style={styles.titulo}>Reserver+</Text>
 <Image source={logo} style={ styles.imagen} />
<View>
<TouchableHighlight onPress={ () => mostrarFormulario() }

style={styles.btnMostrarForm}>

<Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar  Reservacion' : 'Agregar una nueva Reservación'} </Text>
</TouchableHighlight>
</View>
<View style={styles.contenido}>
{ mostrarform ? (
<>
<Text style={styles.titulo}>Crear Nueva Reservacion</Text>
<Formulario
reservaciones={reservaciones}
setReservaciones={setReservaciones}
guardarMostrarForm={guardarMostrarForm}
guardarReservacionesStorage={guardarReservacionesStorage}
/>
</>
) : (
<>
<Text style={styles.titulo}> {reservaciones.length > 0 ? 'Administra tus reservaciones' :

'No hay reservaciones, agrega una nueva'} </Text>
<FlatList
style={styles.listado}
data={reservaciones}
renderItem={ ({item}) => <Reservacion item={item}

eliminarCliente={eliminarCliente} /> }
keyExtractor={ reservacion => reservacion.id}
/>
</>
) }
</View>
</View>
</TouchableWithoutFeedback>
);
};
const styles = StyleSheet.create({
contenedor: {
backgroundColor: Colors.PRIMARY_COLOR,
flex: 1
},
titulo: {
color: '#FFF',
marginTop: Platform.OS === 'ios' ? 40 : 20 ,
marginBottom: 20,
fontSize: 24,
fontWeight: 'bold',
textAlign: 'center',
marginTop: 40,
},
imagen:{
width: 150, 
height: 150,
 alignSelf:'center'
},
contenido: {
flex: 1,
marginHorizontal: '2.5%',
},
listado: {
flex: 1,

},
btnMostrarForm: {
padding: 10,
backgroundColor:'blue',
marginVertical: 10
},
textoMostrarForm: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
});
export default App;