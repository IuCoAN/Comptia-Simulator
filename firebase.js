// Import Firebase from CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPELmhZcf9ZR0aAmWosH2s2KIY-W3Vw54",
    authDomain: "readyfy-c966f.firebaseapp.com",
    projectId: "readyfy-c966f",
    storageBucket: "readyfy-c966f.appspot.com",
    messagingSenderId: "1074882979004",
    appId: "1:1074882979004:web:011536079e87e3d6275cb9",
    measurementId: "G-KLZ4EJLL2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize services
const auth = getAuth();  // Changed: don't pass app
const db = getFirestore();  // Changed: don't pass app
const analytics = getAnalytics();  // Changed: don't pass app

// Make sure to export the initialized instances
export { auth, db, analytics };