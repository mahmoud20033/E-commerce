import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBvr-LZaJC2SH9LyxplX0N5euGJOV_VLX0",
    authDomain: "mass-5a8dc.firebaseapp.com",
    projectId: "mass-5a8dc",
    storageBucket: "mass-5a8dc.firebasestorage.app",
    messagingSenderId: "100525740643",
    appId: "1:100525740643:web:2ea336ce0670229756de56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app