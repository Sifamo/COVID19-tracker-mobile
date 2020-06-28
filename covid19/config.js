import * as firebase from 'firebase' 

const firebaseConfig = {
    apiKey: "AIzaSyBfWps6h3zBMlLivjXQWDOsFqby50yw8Cw",
    authDomain: "covid19-6b3ac.firebaseapp.com",
    databaseURL: "https://covid19-6b3ac.firebaseio.com",
    projectId: "covid19-6b3ac",
    storageBucket: "covid19-6b3ac.appspot.com",
    messagingSenderId: "557838002731"
  };
  const Firebase = firebase.initializeApp(firebaseConfig);
  export default Firebase;