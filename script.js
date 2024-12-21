import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// DOM Elements
const googleSignInBtn = document.getElementById('google-sign-in');
const signOutBtn = document.getElementById('sign-out');
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const userNameSpan = document.getElementById('user-name');
const practiceModeBtn = document.getElementById('practice-mode');

let correctAnswers = 0; // Track correct answers
let userAnswers = []; // Track user answers

// Sign in with Google
async function signInWithGoogle() {
    console.log("Attempting to sign in with Google...");
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Successfully signed in:", user.email);
        // Redirect to home page after successful login
        window.location.href = 'home.html';
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        alert("Error signing in. Please try again.");
    }
}

// Sign out
async function handleSignOut() {
    try {
        await signOut(auth);
        console.log("Successfully signed out");
        updateUIOnAuth(null);
    } catch (error) {
        console.error("Error signing out: ", error);
        alert("Error signing out. Please try again.");
    }
}

// Update UI based on auth state
async function updateUIOnAuth(user) {
    if (user) {
        userNameSpan.textContent = user.displayName || 'User';
        if (loginScreen) loginScreen.classList.add('hidden');
        if (dashboard) dashboard.classList.remove('hidden');
    } else {
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (dashboard) dashboard.classList.add('hidden');
    }
}

// Auth state observer
auth.onAuthStateChanged((user) => {
    console.log("Auth state changed:", user ? "logged in" : "logged out");
    updateUIOnAuth(user);
});

document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', signInWithGoogle);
    }

    if (signOutBtn) {
        signOutBtn.addEventListener('click', handleSignOut);
    }

    if (practiceModeBtn) {
        practiceModeBtn.addEventListener('click', () => {
            console.log('Practice mode selected');
            // Add your practice mode logic here
        });
    }
});

// Function to start practice mode for a specific certification
function startPractice(certification) {
    console.log(`Starting practice mode for ${certification}`);
    // Implement logic to load questions based on the selected certification
    // Redirect to the practice mode screen or load the questions directly
}