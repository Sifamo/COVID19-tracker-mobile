import * as firebase from 'firebase' 

const firebaseConfig = {
    apiKey: "AIzaSyCEpUStvMdCsjSymHlcM8poJ6S21bT7HL0",
    authDomain: "covid19mobapp.firebaseapp.com",
    databaseURL: "https://covid19mobapp.firebaseio.com",
    projectId: "covid19mobapp",
    storageBucket: "covid19mobapp.appspot.com",
    messagingSenderId: "322796463910"
  };
  const Firebase = firebase.initializeApp(firebaseConfig);
  export default Firebase;