// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export class Firebase {
    // Your web app's Firebase configuration
    static readonly firebaseConfig = {
        apiKey: "AIzaSyA2Ai2FwwcM4vyWawGliHHLiyKKGaN7qes",
        authDomain: "repo-47316.firebaseapp.com",
        projectId: "repo-47316",
        storageBucket: "repo-47316.appspot.com",
        messagingSenderId: "468484065421",
        appId: "1:468484065421:web:992d23bf6f69ec3a32bac4"
    };

    static init() {
        const app = initializeApp(this.firebaseConfig);
        app;
    }
}