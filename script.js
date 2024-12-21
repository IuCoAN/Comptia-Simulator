import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getQuestions } from './questions.js'; // Import the getQuestions function

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// DOM Elements
const googleSignInBtn = document.getElementById('google-sign-in');
const signOutBtn = document.getElementById('sign-out');
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const userNameSpan = document.getElementById('user-name');
const practiceModeBtn = document.getElementById('practice-mode');
const examModeBtn = document.getElementById('exam-mode');
const examScreen = document.getElementById('exam-screen');
const questionContainer = document.getElementById('question-container');
const timerDisplay = document.getElementById('time');
const nextQuestionBtn = document.getElementById('next-question');
const endExamBtn = document.getElementById('end-exam'); // End Exam button

let questions = [];
let currentQuestionIndex = 0;
let timer;
let timeLeft = 600; // 10 minutes in seconds
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

        // Fetch user progress from a database or local storage (mocked here)
        const progress = await getUserProgress(user.uid); // Assume this function fetches user progress
        const progressElement = document.getElementById('progress-percentage');
        if (progressElement) {
            progressElement.textContent = progress;
        }

    } else {
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (dashboard) dashboard.classList.add('hidden');
    }
}

// Mock function to get user progress (replace with actual implementation)
async function getUserProgress(userId) {
    // This is a placeholder. You would typically fetch this data from a database.
    return 75; // Example: 75% of practice questions completed
}

// Auth state observer
auth.onAuthStateChanged((user) => {
    console.log("Auth state changed:", user ? "logged in" : "logged out");
    updateUIOnAuth(user);
});

document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners
    googleSignInBtn.addEventListener('click', signInWithGoogle);
    signOutBtn.addEventListener('click', handleSignOut);

    // Mode Selection Event Listeners
    practiceModeBtn.addEventListener('click', () => {
        console.log('Practice mode selected');
        // Add your practice mode logic here
    });

    examModeBtn.addEventListener('click', () => {
        console.log('Exam mode selected');
        window.location.href = 'exam.html'; // Redirect to the exam mode page
    });

    // Restart Exam button functionality
    const restartExamBtn = document.getElementById('restart-exam');
    if (restartExamBtn) {
        restartExamBtn.addEventListener('click', () => {
            // Hide the review screen and show the dashboard
            document.getElementById('review-screen').classList.add('hidden'); // Hide review screen
            document.getElementById('dashboard').classList.remove('hidden'); // Show dashboard

            // Reset variables for a new exam
            currentQuestionIndex = 0;
            correctAnswers = 0;
            userAnswers = [];
        });
    }
});

// Function to start Exam Mode
function startExamMode() {
    questions = getQuestions(); // Fetch questions
    currentQuestionIndex = 0; // Reset question index
    correctAnswers = 0; // Reset correct answers count
    userAnswers = []; // Reset user answers
    console.log("Starting Exam Mode...");
    
    // Show the exam screen and hide the dashboard
    dashboard.classList.add('hidden');
    examScreen.classList.remove('hidden');
    
    displayQuestion(); // Display the first question
    startTimer(); // Start the timer
}

// Function to display the current question
function displayQuestion() {
    console.log("Displaying question:", currentQuestionIndex);
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        console.log("Current question:", question);
        
        // Display the question and indicate how many answers are required
        questionContainer.innerHTML = `
            <h3>${question.question} ${question.requiredAnswers ? `(Select ${question.requiredAnswers} answer${question.requiredAnswers > 1 ? 's' : ''})` : ''}</h3>
            <ul>
                ${question.options.map(option => `
                    <li class="answer-option" onclick="toggleAnswer('${option}')">
                        <label>${option}</label>
                    </li>
                `).join('')}
            </ul>
        `;
        
        // Update the question counter
        const questionsLeft = questions.length - currentQuestionIndex - 1;
        document.getElementById('questions-left').textContent = questionsLeft;

        nextQuestionBtn.classList.remove('hidden'); // Show the next question button
    } else {
        endExam();
    }
}

// Function to toggle answer selection
function toggleAnswer(selectedOption) {
    const answerOptions = document.querySelectorAll('.answer-option');
    const selectedElement = Array.from(answerOptions).find(option => option.textContent.trim() === selectedOption);
    
    if (selectedElement) {
        selectedElement.classList.toggle('selected'); // Toggle the selected class
    }
}

// Next Question button functionality
nextQuestionBtn.addEventListener('click', () => {
    const selectedElements = document.querySelectorAll('.answer-option.selected');
    if (selectedElements.length === questions[currentQuestionIndex].requiredAnswers) {
        const selectedOptions = Array.from(selectedElements).map(el => el.textContent.trim());
        const correctAnswers = questions[currentQuestionIndex].correctAnswer;

        // Store user answers
        userAnswers.push({
            question: questions[currentQuestionIndex].question,
            selected: selectedOptions,
            correct: correctAnswers
        });

        // Validate the answers
        const isCorrect = selectedOptions.every(option => correctAnswers.includes(option));
        if (isCorrect) {
            correctAnswers++;
            console.log("Correct answer(s)!");
        } else {
            console.log("Wrong answer(s)!");
        }

        currentQuestionIndex++;
        displayQuestion();
    } else {
        alert(`Please select ${questions[currentQuestionIndex].requiredAnswers} answer${questions[currentQuestionIndex].requiredAnswers > 1 ? 's' : ''} before proceeding.`);
    }
});

// Make toggleAnswer a global function
window.toggleAnswer = toggleAnswer; // Attach to window object

// Timer function
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endExam();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
}

// Function to end the exam
function endExam() {
    clearInterval(timer);
    console.log("Exam finished!");

    // Calculate success rate
    const successRate = (correctAnswers / questions.length) * 100;

    // Populate review container with user answers and correct answers
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = ""; // Clear previous content
    userAnswers.forEach((answer, index) => {
        reviewContainer.innerHTML += `
            <div class="review-item">
                <h4>Question ${index + 1}: ${answer.question}</h4>
                <p>Your Answer(s): ${answer.selected.join(', ')}</p>
                <p>Correct Answer(s): ${answer.correct.join(', ')}</p>
            </div>
        `;
    });

    // Show success rate to the user
    alert(`Exam finished! Your success rate is ${successRate.toFixed(2)}%.`); // Show success rate

    // Show the review screen and hide the exam screen
    examScreen.classList.add('hidden'); // Hide exam screen
    document.getElementById('review-screen').classList.remove('hidden'); // Show review screen
}

// End Exam button functionality
endExamBtn.addEventListener('click', endExam);

console.log("Current correct answers:", correctAnswers);

// Function to start practice mode for a specific certification
function startPractice(certification) {
    console.log(`Starting practice mode for ${certification}`);
    // Here you can implement logic to load questions based on the selected certification
    // For example, you might fetch questions from a database or filter them based on the certification
    // You can also navigate to the exam screen or load the questions directly
}

// Function to start the exam for a specific certification
function startExam(certification) {
    console.log(`Starting exam for ${certification}`);
    // Here you can implement logic to load questions based on the selected certification
    // For example, you might fetch questions from a database or filter them based on the certification
    // You can also navigate to the exam screen or load the questions directly
}