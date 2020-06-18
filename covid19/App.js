import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuizTab from './screens/tabs/QuizTab'
import Map from './screens/tabs/Map'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
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
        <Tab.Screen name="Quizz" component={QuizTab} />
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}