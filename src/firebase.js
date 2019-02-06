import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDxWhfXX5tVjr7cVawKSG5dMtzJKcisZ8Q",
  authDomain: "counterspell-6d6f4.firebaseapp.com",
  databaseURL: "https://counterspell-6d6f4.firebaseio.com",
  projectId: "counterspell-6d6f4",
  storageBucket: "counterspell-6d6f4.appspot.com",
  messagingSenderId: "4593126161"
};
firebase.initializeApp(config);
export default firebase;
