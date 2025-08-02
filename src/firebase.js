import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firsbaseConfig = {
    apiKey: "AIzaSyCb8V8RlXjSt5hy0qOvNk92dOKeLRgPL2I",
    authDomain: "chaturi-quiz-application.firebaseapp.com",
    projectId: "chaturi-quiz-application",
    storageBucket: "chaturi-quiz-application.firebasestorage.app",
    messagingSenderId: "1059486866705",
    appId: "1:1059486866705:web:7d1fbebde7bea9235800b0",
    measurementId: "G-QPSY0LWD9Z"
}


const app = initializeApp(firsbaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider};