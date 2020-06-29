import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import Quiz from './Components/quiz';
import { StyleSheet, StatusBar, TouchableOpacity, View,Button, Text,Platform,Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Notifications } from 'expo';
import Constants from 'expo-constants';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quizFinish: false,
			score: 0,
			expoPushToken: '',
    		notification: {},
		};
	}
	
	registerForPushNotificationsAsync = async () => {
		if (Constants.isDevice) {
		  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		  let finalStatus = existingStatus;
		  if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		  }
		  if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		  }
		  token = await Notifications.getExpoPushTokenAsync();
		  console.log(token);
		  this.setState({ expoPushToken: token });
		} else {
		  alert('Must use physical device for Push Notifications');
		}
	
		if (Platform.OS === 'android') {
		  Notifications.createChannelAndroidAsync('default', {
			name: 'default',
			sound: true,
			priority: 'max',
			vibrate: [0, 250, 250, 250],
		  });
		}
	  };

	  componentDidMount() {
	
		// Handle notifications that are received or selected while the app
		// is open. If the app was closed and then opened by tapping the
		// notification (rather than just tapping the app icon to open it),
		// this function will fire on the next tick after the app starts
		// with the notification data.
		this._notificationSubscription = Notifications.addListener(this._handleNotification);
	  }
	
	  _handleNotification = notification => {
		Vibration.vibrate();
		console.log(notification);
		this.setState({ notification: notification });
	  };

	  sendPushNotification = async () => {
		const message = {
		  to: this.state.expoPushToken, 
		  sound: 'default',
		  title: 'Original Title',
		  body: 'And here is the body!',
		  data: { data: 'goes here' },
		  _displayInForeground: true,
		};
		const response = await fetch('https://exp.host/--/api/v2/push/send', {
		  method: 'POST',
		  headers: {    
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(message),
		});
	  };


	_onPressBack() {
		const { goBack } = this.props.navigation;
		goBack();
	}
	async _quizFinish(score) {
		this.setState({ quizFinish: true, score: score });
	}
	_conseils() {}

	_scoreMessage(score) {
		if (score <= 10) {
			return (
				<View style={styles.innerContainer}>
					<View style={{ flexDirection: 'row' }}>
						<Icon name="trophy" size={30} color="white" />
					</View>
					<Text style={styles.score}>You are sick</Text>
					<Text style={styles.score}>You scored {score}</Text>
					<Button title={'Press to Send Notification'} onPress={() => this.sendPushNotification()} />
				</View>
			);
		} else if (score > 10 && score < 14) {
			return (
				<View>
					<Text style={styles.resultat}>Résultat</Text>
					<Text style={styles.resultmesssage}>
						Votre situation peut relever d’un COVID 19. Vos symptômes nécessitent une auto-surveillance.
					</Text>
					<View
						style={{
							marginTop: 30,
							padding: 20,
							borderColor: 'blue',
							borderWidth: 1,
						}}
					>
						<Text style={{ marginTop: 10 }}>Que faire de mon auto-évaluation ?</Text>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 15,
							}}
						>
							Surveillez attentivement votre état de santé.
						</Text>
						<Text>-Mesurez votre température deux fois par jour.</Text>
						<Text>-Restez attentif à toute aggravation.</Text>
						<Text>-Au moindre doute, consultez un médecin.</Text>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>Restez chez vous.</Text>
						<Text>
							-Pour casser les chaînes de transmission, nous vous conseillons de vous isoler et de
							respecter les gestes barrières. Vous protégerez ainsi vos proches.
						</Text>
					</View>
					<Text style={{ marginTop: 30, fontSize: 12, padding: 10 }}>
						N.B: La recommandation affichée peut évoluer suivant les informations en provenance des
						autorités de santé et des chercheurs. Elle ne constitue pas un avis médical. En cas de doute,
						demandez conseil à votre médecin ou pharmacien.
					</Text>
				</View>
			);
		} else if (score >= 14) {
			return (
				<View style={styles.innerContainer}>
					<View style={{ flexDirection: 'row' }}>
						<Icon name="trophy" size={30} color="white" />
						<Icon name="trophy" size={30} color="white" />
						<Icon name="trophy" size={30} color="white" />
					</View>
					<Text style={styles.score}>You are good to go</Text>
					<Text style={styles.score}>Congrats you scored {score}% </Text>
				</View>
			);
		}
	}
	render() {
		return (
			<View style={{ flex: 1, marginTop: 80 }}>
				{this.state.quizFinish ? (
					<View style={styles.container}>
						<View style={styles.circle}>{this._scoreMessage(this.state.score)}</View>
					</View>
				) : (
					<Quiz quizFinish={(score) => this._quizFinish(score)} />
				)}
			</View>
		);
	}
}
const scoreCircleSize = 300;
const styles = StyleSheet.create({
	score: {
		color: 'white',
		fontSize: 20,
		fontStyle: 'italic',
	},
	circle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: scoreCircleSize,
		height: scoreCircleSize,
		borderRadius: scoreCircleSize / 2,
		backgroundColor: 'green',
	},
	innerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	toolbar: {
		backgroundColor: '#81c04d',
		paddingTop: 30,
		paddingBottom: 10,
		flexDirection: 'row',
	},
	toolbarButton: {
		width: 55,
		color: '#fff',
		textAlign: 'center',
	},
	toolbarTitle: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		flex: 1,
	},
	resultat: {
		fontSize: 70,
		alignSelf: 'center',
		fontWeight: 'bold',
		color: '#FFA500',
		marginTop: 150,
	},
	resultmesssage: {
		fontSize: 22,
		textAlign: 'center',
		marginTop: 50,
		padding: 6,
	},
});
