import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBBC3BE9CwzsQoMydO30s22LMj0CfAzN6M",
  authDomain: "clothingshoppingcart.firebaseapp.com",
  projectId: "clothingshoppingcart",
  storageBucket: "clothingshoppingcart.appspot.com",
  messagingSenderId: "985643563465",
  appId: "1:985643563465:web:35ccf597f918ee464c9018",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
