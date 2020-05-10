import React from 'react';
import {Dimensions,StatusBar} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createStackNavigator,TransitionPresets} from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen' ; 
import {Provider} from './src/context/BlogContext';
import ShowScreen from './src/screens/ShowScreen' ;
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import PassResetScreen from './src/screens/PassResetScreen';
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
//hr and wr are used throughout the app to help with scalability/responsiveness

const AppStack = createStackNavigator(
  {
    Index : IndexScreen,
    Show : ShowScreen,
    Create : CreateScreen ,
    Edit : EditScreen ,
  },
  {
    initialRouteName : 'Index',
    defaultNavigationOptions :{
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: {
        backgroundColor: 'transparent', // to remove a white flickering while screen transitions
    },
      headerTintColor : "#B2983B",
      title : "NOTES",
      headerStyle : {backgroundColor :"#000000"},
      headerTitleStyle : {color : "#B2983B",fontSize : 26*wR,fontFamily :"Roboto",marginLeft: 135*wR}
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Login : LoginScreen,
    Signup : SignupScreen,
    PassReset : PassResetScreen
  },
  {
    initialRouteName : 'Login',
    defaultNavigationOptions :{
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: {
        backgroundColor: 'transparent', // to remove a white flickering while screen transitions
      },
    }
  }
);

const SplashStack = createStackNavigator(
  {
    Splash : SplashScreen
  },
  {
    initialRouteName : 'Splash',
    defaultNavigationOptions :{
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: {
        backgroundColor: 'transparent', // to remove a white flickering while screen transitions
    },
    }
  }
);
//switched to createAnimatedSwitchNavigator as the user could back button in index screen to go back to splash screen when plain createStackNavigator was used
const App =  createAppContainer(createAnimatedSwitchNavigator(
  {
    Splash : SplashStack,
    Auth : AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions :{
      ...TransitionPresets.FadeFromBottomAndroid,
      cardStyle: {
        backgroundColor: 'transparent', // to remove a white flickering while screen transitions
    },}
  }
)) ;
export default ()=>{return (<Provider><App/><StatusBar hidden={false} /></Provider>);
}