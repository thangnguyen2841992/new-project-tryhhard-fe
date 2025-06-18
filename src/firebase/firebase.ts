// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbeaw5nxJMqAbOWEHT3Ct92-FKWV9_jDY",
    authDomain: "toanthang-c3ec5.firebaseapp.com",
    projectId: "toanthang-c3ec5",
    storageBucket: "toanthang-c3ec5.appspot.com",
    messagingSenderId: "590661065134",
    appId: "1:590661065134:web:51596945e1743e4348103f",
    measurementId: "G-LLZ34M3WFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);

export {storage};