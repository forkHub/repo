import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXr7dp2mMXT67W8o_IUlavwnOVuWIZF9k",
    authDomain: "blockly-cdddf.firebaseapp.com",
    projectId: "blockly-cdddf",
    storageBucket: "blockly-cdddf.appspot.com",
    messagingSenderId: "677962303737",
    appId: "1:677962303737:web:5a9f37c2a54c6f00affa28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'share');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

window["fbUpload"] = async (wspace) => {
    wspace;
}

window["fbDownload"] = async (id) => {
    id;
}

