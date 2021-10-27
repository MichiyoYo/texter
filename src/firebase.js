import * as firebase from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWJ_wv-RsHaqXbmHuxCxSuCtX2FapWV40",
  authDomain: "texter-d3961.firebaseapp.com",
  projectId: "texter-d3961",
  storageBucket: "texter-d3961.appspot.com",
  messagingSenderId: "808156632674",
  appId: "1:808156632674:web:87d866afa50e88da76233b",
  measurementId: "G-KN346NCNXX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
