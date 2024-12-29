import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// DOM Elements
const googleSignInBtn = document.getElementById('google-sign-in');
const signOutBtn = document.getElementById('sign-out');
const userNameSpan = document.getElementById('user-name');

// Sign in with Google
async function signInWithGoogle() {
    console.log("Attempting to sign in with Google...");
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Successfully signed in:", user.email);
        // Show Welcome + username message on index.html after successful login
        document.getElementById('user-name').textContent = `Welcome, ${user.displayName || 'User'}!`;
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
    } else {
        userNameSpan.textContent = 'User'; // Reset to default
    }
}

// Auth state observer
auth.onAuthStateChanged((user) => {
    console.log("Auth state changed:", user ? "logged in" : "logged out");
    updateUIOnAuth(user);
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', signInWithGoogle);
    }

    if (signOutBtn) {
        signOutBtn.addEventListener('click', handleSignOut);
    }
});

function renderButton() {
    if (userIsLoggedIn) {
        return <button onClick={handleSignOut}>Sign Out</button>;
    } else {
        return <button onClick={handleLogin}>Login</button>;
    }
}

function updateButtonVisibility(userIsLoggedIn) {
    const signOutButton = document.getElementById('sign-out');
    if (userIsLoggedIn) {
        signOutButton.style.display = 'block'; // Show the Sign Out button
    } else {
        signOutButton.style.display = 'none'; // Hide the Sign Out button
    }
}

// Call this function with the appropriate login status
updateButtonVisibility(userIsLoggedIn);

function handleLogin() {
    // Perform login logic...
    // On success:
    window.location.href = '/dashboard'; // Update this to the correct existing page
}