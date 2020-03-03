import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Welcome from "./pages/welcome";
import Caixaeletronico from "./pages/caixaeletronico";

const navOptionHandler = (navigation) => ({
    headerShown: false
  })

const RootStack = createStackNavigator({
    Caixaeletronico: {
        screen: Caixaeletronico,
        navigationOptions: navOptionHandler
    }
});
  
  const welcomeStack = createStackNavigator({
    Welcome: {
      screen: Welcome,
      navigationOptions: navOptionHandler
    }
  })
  
  const MainApp = createSwitchNavigator(
    {
      app: RootStack,
      wel: welcomeStack
    },
    {
      initialRouteName: 'wel'
    }
  )
  
  const AppNavigator = createAppContainer(MainApp);
  
  export default class App extends React.Component {  
    render(){
      return (
        <AppNavigator/>
      )
    }
  }
  