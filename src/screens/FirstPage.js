import React, { Component, memo} from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Background from "../components/Background";
import CalendarPicker from 'react-native-calendar-picker';

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      phone :'',
      comensales:'',
      fecha:'',
      hora:'',
      selectedStartDate: null,
      
    };
    this.onDateChange = this.onDateChange.bind(this);
  } 
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString().split('00:00:00 GMT+0000') : '';
    const { navigate } = this.props.navigation;
    
    var dataToSend = {data: " Nombre: " + this.state.username
    + " Comensales: "  + this.state.comensales
    + " Fecha: " +  startDate 
    +  " Hora: " + this.state.hora}

    return (

      <View style={{padding:20}}> 
      <ScrollView>
      
      <Text style={{fontStyle:'italic'}}>  </Text>
      
      <TextInput
      value={this.state.username}
      onChangeText={username => this.setState({ username })}
      placeholder={' Nombre: '}
      style={styles.input}
      placeholderTextColor='black'
      
      />
      <TextInput
      value={this.state.phone}
      onChangeText={phone => this.setState({ phone })}
      placeholder={' Teléfono: '}
      placeholderTextColor='black'
      style={styles.input}
      
      />
      
      <TextInput
      value={this.state.comensales}
      onChangeText={comensales => this.setState({ comensales })}
      placeholder={' N# Comensales:                                        '}
      style={styles.input}
      placeholderTextColor='black'
      
      />
      
      <TextInput
      value={this.state.hora}
      onChangeText={hora => this.setState({ hora })}
      placeholder={' Hora: '}
      style={styles.input}
      placeholderTextColor='black'
      
      />  
      
      </ScrollView>
      <View>
      
      <CalendarPicker
          startFromMonday={true}
          
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={
            [
              'Mon', 
              'Tue', 
              'Wed', 
              'Thur', 
              'Fri', 
              'Sat', 
              'Sun'
            ]}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            fontFamily: 'Cochin',
            color: '#000000',
          }}
          onDateChange={this.onDateChange}
      
      />
      
      <View style={styles.button}>
      <Button
      style={styles.input}
      title="Reservar"
      color="#F6820D"
      onPress={() =>
        navigate('ThirdPage', dataToSend)            
      }
      />
      </View>

      </View>

      </View>
      );
    }
  }
  const styles = StyleSheet.create({
    input: {
      flex:1,
      padding: 5,
      marginBottom: 10,
      backgroundColor: '#D3D3D3',
      borderRadius:20,
      
    },
    
    button:{
      borderRadius:40,
      backgroundColor:"#F6820D",
      
    },
    
  });
  
  export default memo (FirstPage)
  