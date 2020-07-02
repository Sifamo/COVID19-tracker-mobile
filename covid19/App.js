import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuizTab from './screens/tabs/QuizTab';
import Map from './screens/tabs/Map';
import LoginScreen from './screens/LoginScreen';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			healthStatus: null,
			location: null,
			Id: null,
			phoneNumber: '',
			date: null,
			Users: [],
		};

		const db = SQLite.openDatabase('MyDb.db');

		db.transaction((tx) => {
			tx.executeSql(
				'create table if not exists Users (Id INTEGER PRIMARY KEY AUTOINCREMENT, phoneNumber INTEGER, date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);'
			);
			tx.executeSql('select * from Users', [], (_, { rows }) => {
				this.setState({ Users: rows._array });
				console.log(JSON.stringify(this.state.Users));
			});
		});
	}

	changeHealthStatus(value) {
		this.setState({ healthStatus: value });
	}

	AddUserClick = () => {
		const db = SQLite.openDatabase('MyDb.db');
		db.transaction((tx) => {
			// console.log("4- Insert row in User");
			const value = "'" + this.state.phoneNumber + "','" + this.state.date + "'";
			tx.executeSql('insert into Users (phoneNumber,date) values (' + value + ')');

			//console.log("5- select User");
			tx.executeSql('select * from Users', [], (_, { rows }) => {
				this.setState({ Users: rows._array });
			});
		});
	};
	render() {
		return (
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;

							if (route.name === 'Map') {
								iconName = focused ? 'map' : 'map-o';
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
					<Tab.Screen name="Login" component={LoginScreen} onPress={this.AddUserClick} />
					<Tab.Screen name="Quizz">
						{() => (
							<QuizTab
								healthStatus={this.state.healthStatus}
								changeHealthStatus={this.changeHealthStatus.bind(this)}
							/>
						)}
					</Tab.Screen>

					<Tab.Screen name="Map">
						{() => <Map location="testProp" changeHealthStatus={this.changeHealthStatus.bind(this)} />}
					</Tab.Screen>
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}
