import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuizTab from './screens/tabs/QuizTab'
import Map from './screens/tabs/Map'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default class App extends React.Component{
  constructor(props){
    super (props);
    this.state = {
      healthStatus: null,
      location: null
    };
  }

  changeHealthStatus(value){
    this.setState({ healthStatus: value,});
  }

  render() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = focused
                ? 'map'
                : 'map-o';
                return <FontAwesome name={iconName} size={size} color={color} />;

            } else if (route.name === 'Quizz') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
              return <Ionicons name={iconName} size={size} color={color} />;

            }

            // You can return any component that you like here!
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Quizz" >
          {() =>  <QuizTab healthStatus={this.state.healthStatus} changeHealthStatus={this.changeHealthStatus.bind(this)}/>}
        </Tab.Screen>

        <Tab.Screen name="Map" >
          {() =>  <Map location="testProp" changeHealthStatus={this.changeHealthStatus.bind(this)}/>}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
      }
}