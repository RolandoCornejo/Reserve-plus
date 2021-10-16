import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';
import colors from '../src/utils/colors';
const Formulario = ({reservaciones, setReservaciones, guardarMostrarForm, guardarReservacionesStorage}) => {
//variables para el formulario
const [cliente, guardarCliente] = useState('');
const [cantidad, guardarCantidad] = useState('');
const [telefono, guardarTelefono] = useState('');
const [fecha, guardarFecha] = useState('');
const [hora, guardarHora] = useState('');
const [descripcion, guardarDescripcion] = useState('');
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
const showDatePicker = () => {
setDatePickerVisibility(true);
};

const hideDatePicker = () => {
setDatePickerVisibility(false);
};
const confirmarFecha = date => {
const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
guardarFecha(date.toLocaleDateString('es-ES', opciones));
hideDatePicker();
};
// Muestra u oculta el Time Picker
const showTimePicker = () => {
setTimePickerVisibility(true);
};
const hideTimePicker = () => {
setTimePickerVisibility(false);
};
const confirmarHora = hora => {
const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
guardarHora(hora.toLocaleString('es-ES', opciones));
hideTimePicker();
};
// Crear nueva cita
const crearNuevaReservacion = () => {
// Validar
if(cliente.trim() === '' ||
cantidad.trim() === '' ||
telefono.trim() === '' ||
fecha.trim() === '' ||
hora.trim() === '' ||
descripcion.trim() === '')
{
// Falla la validación
mostrarAlerta();
return;
}
// Crear una nueva cita
const reservacion = { cliente, cantidad, telefono, fecha, hora, descripcion };
reservacion.id = shortid.generate();
// console.log(cita);
// Agregar al state
const reservacionesNuevo = [...reservaciones, reservacion];
setReservaciones(reservacionesNuevo);
// Pasar las nuevas citas a storage
guardarReservacionesStorage(JSON.stringify(reservacionesNuevo));
// Ocultar el formulario
guardarMostrarForm(false);
// Resetear el formulario
guardarDescripcion('');

guardarCantidad('');
guardarCliente('');
guardarHora('');
guardarFecha('');
guardarTelefono('');
}
// Muestra la alerta si falla la validación
const mostrarAlerta = () => {
Alert.alert(
'Error', // Titulo
'Todos los campos son obligatorios', // mensaje
[{
text: 'OK' // Arreglo de botones
}]
)
}
return (
<>
<ScrollView style={styles.formulario}>
<View>
<Text style={styles.label}>Nombre del Cliente:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarCliente(texto) }
/>
</View>
<View>
<Text style={styles.label}>Cantidad de Personas:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarCantidad(texto) }
/>
</View>
<View>
<Text style={styles.label}>Teléfono Contacto:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarTelefono(texto) }
keyboardType='numeric'
/>
</View>
<View>
<Text style={styles.label}>Fecha:</Text>
<Button title="Seleccionar Fecha" onPress={showDatePicker} />
<DateTimePickerModal
isVisible={isDatePickerVisible}
mode="date"
onConfirm={confirmarFecha}
onCancel={hideDatePicker}
locale='es_ES'
headerTextIOS="Elige la fecha"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{fecha}</Text>

</View>
<View>
<Text style={styles.label}>Hora:</Text>
<Button title="Seleccionar Hora" onPress={showTimePicker} />
<DateTimePickerModal
isVisible={isTimePickerVisible}
mode="time"
onConfirm={confirmarHora}
onCancel={hideTimePicker}
locale='es_ES'
headerTextIOS="Elige una Hora"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{hora}</Text>
</View>
<View>
<Text style={styles.label}>Descripcion:</Text>
<TextInput
multiline
style={styles.input}
onChangeText={ texto => guardarDescripcion(texto) }
/>
</View>
<View>
<TouchableHighlight onPress={ () => crearNuevaReservacion() }

style={styles.btnSubmit}>

<Text style={styles.textoSubmit}> Reservar</Text>
</TouchableHighlight>
</View>
</ScrollView>
</>
);
}
const styles = StyleSheet.create({
formulario: {
backgroundColor: '#FFF',
paddingHorizontal: 20,
paddingVertical: 10,
flex: 1
},
label: {
fontWeight: 'bold',
fontSize: 18,
marginTop: 20
},
input: {
marginTop: 10,
height: 50,
borderColor: '#e1e1e1',
borderWidth: 1,
borderStyle: 'solid'
},
btnSubmit: {
padding: 10,
backgroundColor:'orange',
marginVertical: 10

},
textoSubmit: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
})
export default Formulario;