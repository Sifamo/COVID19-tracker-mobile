import React, { Component } from 'react';
import Quiz from '../../Components/quiz';
import { StyleSheet, StatusBar, TouchableOpacity, View, Text, ImageBackground } from 'react-native';

export default class QuizTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quizFinish: false,
			score: 0,
		};
	}
	_onPressBack() {
		const { goBack } = this.props.navigation;
		goBack();
	}
	_quizFinish(score) {
		this.setState({ quizFinish: true, score: score });
	}
	_conseils() {}

	_scoreMessage(score) {
		if (score <= 10) {
			return (
				<ImageBackground source={require('../../assets/light_red.jpg')} style={styles.background}>
					<Text style={styles.resultat}>Résultat</Text>
					<Text style={styles.resultmesssage}>
						Votre situation peut relever d’un COVID 19. Vos symptômes nécessitent une prise en charge
						rapide.{' '}
					</Text>
					<View style={styles.border_Tab}>
						<Text>Que faire de mon auto-évaluation ?</Text>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 15,
							}}
						>
							Appelez le 141.
						</Text>
						<Text>
							-Les centres de soins proches de vous disposent des dernières procédures en vigueur dans
							votre zone géographique. Une prise en charge adaptée à votre région et à votre état de santé
							vous sera proposée.
						</Text>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>Restez chez vous.</Text>
						<Text>
							-Pour casser les chaînes de transmission, nous vous conseillons de vous isoler et de
							respecter les gestes barrières. Vous protégerez ainsi vos proches.
						</Text>
					</View>
				</ImageBackground>
			);
		} else if (score > 10 && score < 14) {
			return (
				<ImageBackground source={require('../../assets/light_blue.jpg')} style={styles.background}>
					<Text style={styles.resultat}>Résultat</Text>
					<Text style={styles.resultmesssage}>
						Votre situation peut relever d’un COVID 19. Vos symptômes nécessitent une auto-surveillance.
					</Text>
					<View style={styles.border_Tab}>
						<Text>Que faire de mon auto-évaluation ?</Text>
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
				</ImageBackground>
			);
		} else if (score >= 14) {
			return (
				<ImageBackground source={require('../../assets/light_purple.jpg')} style={styles.background}>
					<Text style={styles.resultat}>Résultat</Text>
					<Text style={styles.resultmesssage}>
						Votre état ne semble pas préoccupant ou ne relève probablement pas du COVID 19.
					</Text>
					<View style={styles.border_Tab}>
						<Text>Que faire de mon auto-évaluation ?</Text>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>Restez chez vous.</Text>
						<Text>
							-Pour casser les chaînes de transmission, nous vous conseillons de vous isoler et de
							respecter les gestes barrières. Vous protégerez ainsi vos proches.
						</Text>
					</View>
				</ImageBackground>
			);
		}
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.state.quizFinish ? (
					<View style={styles.container}>
						<View>{this._scoreMessage(this.state.score)}</View>
					</View>
				) : (
					<Quiz quizFinish={(score) => this._quizFinish(score)} />
				)}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	score: {
		color: 'white',
		fontSize: 20,
		fontStyle: 'italic',
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
		color: 'white',
		fontWeight: 'bold',
	},
	background: {
		flex: 1,
	},
	border_Tab: {
		marginTop: 30,
		padding: 20,
		borderColor: 'blue',
		borderWidth: 1,
		backgroundColor: 'lightblue',
	},
});
