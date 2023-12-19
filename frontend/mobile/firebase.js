// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDidDIRN8KOXwQr1DiYRxM8bYGVYyREOaU",
	authDomain: "awesome-m3rashid.firebaseapp.com",
	projectId: "awesome-m3rashid",
	storageBucket: "awesome-m3rashid.appspot.com",
	messagingSenderId: "56914007407",
	appId: "1:56914007407:web:b7cb571820e71cc2eb449a",
	measurementId: "G-Z78CGNFE5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
