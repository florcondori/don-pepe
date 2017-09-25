const firebase = require('firebase');
var config = {
    apiKey: "AIzaSyAMH3mTMgbBmPTn70AkICH2f3aijpdbEpk",
    authDomain: "ecomerce-donpepe.firebaseapp.com",
    databaseURL: "https://ecomerce-donpepe.firebaseio.com",
    projectId: "ecomerce-donpepe",
    storageBucket: "ecomerce-donpepe.appspot.com",
    messagingSenderId: "769304078368"
  };

firebase.initializeApp(config);
console.log(firebase);

const loadProducts = ()=>{
	return firebase.database().ref('/productos/').once('value').then( snapshot => snapshot.val());
};

const loadUsers = ()=>{};

module.exports = {
	products : loadProducts
}