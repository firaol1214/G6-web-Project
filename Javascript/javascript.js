function showRegister() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.add('active');
}

function showLogin() {
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

// Login Form Validation
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    // Email validation
    if (!validateEmail(email.value)) {
        showError('loginEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Password validation
    if (password.value.length < 6) {
        showError('loginPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }
    if (isValid) {
        // Submit the form
        alert('Login successful!');
        this.reset();
    }
});

// Registration Form Validation
document.getElementById('register').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const name = document.getElementById('fullName');
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const department = document.getElementById('department');

    // Name validation
    if (name.value.trim() === '') {
        showError('nameError', 'Full name is required');
        isValid = false;
    }

    // Email validation
    if (!validateEmail(email.value)) {
        showError('registerEmailError', 'Please enter a valid email address');
        isValid = false;
    }// Password validation
    if (password.value.length < 6) {
        showError('registerPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }

    // Confirm Password validation
    if (password.value !== confirmPassword.value) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    // Department validation
    if (department.value === '') {
        showError('departmentError', 'Please select a department');
        isValid = false;
    }
    if (isValid) {
        // Submit the form
        alert('Registration successful!');
        this.reset();
        showLogin();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}