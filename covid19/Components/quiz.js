import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './animbutton';
const { width, height } = Dimensions.get('window');
let arrnew = [];
const jsonData = {
	quiz: {
		quiz1: {
			question1: {
				correctoption: 'option1',
				options: {
					option1: '37 degrés',
					option2: 'entre 37 et 38 degrés',
					option3: 'entre 38 et 40 degrés',
					option4: 'plus de 40 degrés',
				},
				question: 'Ces dernières 48 heures, quelle a été votre température la plus élevée ?',
			},
			question2: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question:
					'Ces derniers jours, avez-vous noté une forte diminution ou perte de votre goût ou de votre odorat ?',
			},
			question3: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question:
					'Ces derniers jours, avez-vous eu un mal de gorge et/ou des douleurs musculaires et/ou des courbatures inhabituelles ?',
			},
			question4: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question: 'Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles.',
			},
			question5: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question: 'Ces derniers jours, avez-vous une fatigue inhabituelle ?',
			},
			question6: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question: "Depuis 24 heures ou plus, êtes-vous dans l'impossibilité de vous alimenter ou de boire ?",
			},
			question7: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question:
					'Ces dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ?',
			},
			question8: {
				correctoption: 'option1',
				options: {
					option1: 'moins de 18 ans',
					option2: 'entre 18 et 30 ans',
					option3: 'entre 30 et 55 ans',
					option4: 'plus de 55 ans',
				},
				question: "Quel est votre groupe d'âge ? Ceci, afin de calculer un facteur de risque spécifique.",
			},
			question9: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question: 'Ces derniers jours, avez-vous une fatigue inhabituelle ?',
			},
			question10: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
					option3: 'Ne sait pas',
				},
				question:
					'Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez vous un traitement à visée cardiologique ?',
			},
			question11: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question: 'Êtes-vous diabétique ?',
			},
			question12: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question: 'Avez-vous ou avez-vous eu un cancer ces trois dernières années ?',
			},
			question13: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question: 'Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?',
			},
			question14: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
				},
				question: 'Avez-vous une insuffisance rénale chronique dialysée ?',
			},
			question15: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
					option3: 'Non applicable',
				},
				question: 'Êtes-vous enceinte ?',
			},
			question16: {
				correctoption: 'option2',
				options: {
					option1: 'Oui',
					option2: 'Non',
					option3: 'Ne sait pas',
				},
				question: 'Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?',
			},
		},
	},
};
export default class Quiz extends Component {
	constructor(props) {
		super(props);
		this.qno = 0;
		this.score = 0;

		const jdata = jsonData.quiz.quiz1;
		arrnew = Object.keys(jdata).map(function (k) {
			return jdata[k];
		});
		this.state = {
			question: arrnew[this.qno].question,
			options: arrnew[this.qno].options,
			correctoption: arrnew[this.qno].correctoption,
			countCheck: 0,
		};
	}
	prev() {
		if (this.qno > 0) {
			this.qno--;
			this.setState({
				question: arrnew[this.qno].question,
				options: arrnew[this.qno].options,
				correctoption: arrnew[this.qno].correctoption,
			});
		}
	}
	next() {
		if (this.qno < arrnew.length - 1) {
			this.qno++;

			this.setState({
				//countCheck: 0,
				question: arrnew[this.qno].question,
				options: arrnew[this.qno].options,
				correctoption: arrnew[this.qno].correctoption,
			});
		} else {
			this.props.quizFinish(this.score);
		}
	}
	_answer(status, ans) {
		if (status == true) {
			const count = this.state.countCheck + 1;
			this.setState({ countCheck: count });
			if (ans == this.state.correctoption) {
				this.score += 1;
			}
		} else {
			const count = this.state.countCheck - 1;
			this.setState({ countCheck: count });
			if (this.state.countCheck < 1 || ans == this.state.correctoption) {
				this.score -= 1;
			}
		}
	}
	render() {
		let _this = this;
		const currentOptions = this.state.options;
		const options = Object.keys(currentOptions).map(function (k) {
			return (
				<View key={k} style={{ margin: 10 }}>
					<Animbutton
						countCheck={_this.state.countCheck}
						onColor={'purple'}
						effect={'wobble'}
						_onPress={(status) => _this._answer(status, k)}
						text={currentOptions[k]}
					/>
				</View>
			);
		});

		return (
			<ScrollView style={{ backgroundColor: '#A5FAAFF', paddingTop: 80 }}>
				<Text style={styles.QusetionNbr}>Question {(this.qno + 1).toString()} sur 16</Text>
				<View style={styles.container}>
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View style={styles.oval}>
							<Text style={styles.welcome}>{this.state.question}</Text>
						</View>
						<View>{options}</View>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity onPress={() => this.prev()}>
								<View
									style={{
										paddingTop: 5,
										paddingBottom: 5,
										paddingRight: 50,
										paddingLeft: 20,
										borderRadius: 15,
										marginRight: 20,
										backgroundColor: '#0066CC',
									}}
								>
									<Icon name="md-arrow-round-back" size={30} color="white" />
								</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => this.next()}>
								<View
									style={{
										paddingTop: 5,
										paddingBottom: 5,
										paddingRight: 20,
										paddingLeft: 50,
										borderRadius: 15,
										backgroundColor: '#0066CC',
									}}
								>
									<Icon name="md-arrow-round-forward" size={30} color="white" />
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	oval: {
		width: (width * 90) / 100,
		borderRadius: 25,
		backgroundColor: '#23297A',
		marginTop: 30,
	},
	container: {
		flex: 1,
		alignItems: 'center',
	},
	welcome: {
		fontSize: 20,
		margin: 15,
		color: 'white',
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	QusetionNbr: {
		textAlign: 'center',
		fontStyle: 'italic',
		fontWeight: 'bold',
		marginTop: 10,
		fontSize: 19,
	},
});
