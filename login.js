const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');
const attemptsRemaining = document.getElementById('attempts-remaining');

let attemptCount = 3;
const correctUsername = 'admin'; // Change this to your desired username
const correctPassword = 'password123'; // Change this to your desired password

attemptsRemaining.textContent = `Attempts remaining: ${attemptCount}`;

loginBtn.addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        errorMessage.textContent = 'Login successful!';
        errorMessage.style.color = 'green';
        // Redirect to another product page if needed
         window.location.href = 'Product.html';
    } else {
        attemptCount--;
        if (attemptCount > 0) {
            errorMessage.textContent = `Incorrect username or password. ${attemptCount} attempts left.`;
            errorMessage.style.color = 'red';
        } else {
            window.location.href = 'error.html'; // Redirect to error page
        }
    }

    attemptsRemaining.textContent = `Attempts remaining: ${attemptCount}`;
});
