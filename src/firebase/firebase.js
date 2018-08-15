import * as firebase from "firebase";

const prodConfig = {
  apiKey: "AIzaSyBS859hFK5onNfNf_5jc5NIqB6wg4b9Zzc",
  authDomain: "rulethirtyio.firebaseapp.com",
  databaseURL: "https://rulethirtyio.firebaseio.com",
  projectId: "rulethirtyio",
  storageBucket: "rulethirtyio.appspot.com",
  messagingSenderId: "905445074231"
};

const devConfig = {
  apiKey: "AIzaSyBS859hFK5onNfNf_5jc5NIqB6wg4b9Zzc",
  authDomain: "rulethirtyio.firebaseapp.com",
  databaseURL: "https://rulethirtyio.firebaseio.com",
  projectId: "rulethirtyio",
  storageBucket: "rulethirtyio.appspot.com",
  messagingSenderId: "905445074231"
};

const config = process.env.NODE_ENV === "production"
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {auth, db};
