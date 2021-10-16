import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";

const HomeScreen = ({ navigation }) => (
  <Background>
  <Logo />
  <Header> Reserve + </Header>
  
  <Button 
  mode="contained" 
  onPress={() => navigation.navigate("LoginScreen")}
  
  >
  Entrar
  </Button>
  <Button
  mode="outlined"
  onPress={() => navigation.navigate("RegisterScreen")}
  >
  Registrarse
  </Button>
  </Background>
  );
  
  export default memo(HomeScreen);
  