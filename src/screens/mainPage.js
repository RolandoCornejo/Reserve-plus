import React, {Component} from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'
import Emoji from 'react-native-emoji'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Background from "../components/Background";

export default class mainPage extends Component  {
  state = {
        fadeValue: new Animated.Value(2)
      };
    
      _start = () => {
        Animated.timing(this.state.fadeValue, {
          toValue: 1,
          duration: 1000
        }).start()
    }

    static navigationOptions = {
        title: 'Restaurante Cactus ',
      };
      render() {
        const { navigate } = this.props.navigation;
          return (
    <Background>     
          <Animated.View  >

          <TouchableOpacity >
          <Emoji
          onPress ={() => alert("Reserve +. reserveplus.com") }   
          name = "pizza"
          style={{fontSize: 40, textAlign:'center'}}        
          /> 
          <Text onPress ={() => alert("Reserve +. reserveplus.com") } style={{fontSize:30,fontStyle:'italic',textAlign:'center'}}>Contáctanos</Text>
          </TouchableOpacity>


          <TouchableOpacity >  
          <Emoji 
          onPress={() => navigate ('ForthPage')}
          name = "sushi"
          style={{fontSize: 40, textAlign:'center'}} 
          /> 
          <Text onPress={() => navigate ('ForthPage')} style={{fontSize:30,fontStyle:'italic',textAlign:'center'}}>Mis Reservas</Text> 
          </TouchableOpacity> 
         



          <TouchableOpacity >                  
          <Emoji 
          onPress ={() => navigate ('FirstPage')}
          name = "cactus"
          style={{fontSize: 60, textAlign:'center'}} 
          
          /> 
          <Text onPress ={() => navigate ('FirstPage')} style={{fontSize:40,fontStyle:'italic',textAlign:'center'}}> Reservar </Text> 
          </TouchableOpacity> 


          </Animated.View>
          </Background> 
    
  );
}
}