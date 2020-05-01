import React from 'react';
import {Dimensions,StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen' ; 
import {Provider} from './src/context/BlogContext';
import ShowScreen from './src/screens/ShowScreen' ;
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
//hr and wr are used throughout the app to help with scalability/responsiveness
const navigator = createStackNavigator(
  {
    Index : IndexScreen,
    Show : ShowScreen,
    Create : CreateScreen ,
    Edit : EditScreen 
  },
  {
    initialRouteName : 'Index',
    defaultNavigationOptions :{
      headerTintColor : "#B2983B",
      title : "NOTES",
      headerStyle : {backgroundColor :"#000000"},
      headerTitleStyle : {color : "#B2983B",fontSize : 26*wR,fontFamily :"Roboto",marginLeft: 135*wR}
    }
  }
);

const App =  createAppContainer(navigator) ;
export default ()=>{return (<Provider><App/><StatusBar hidden={false} /></Provider>);
}