// Test credentials
const TEST_USERNAME = 'test_user';
const TEST_PASSWORD = 'test_password';

// Get elements
const logoContainer = document.getElementById('logo-container');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const tableView = document.getElementById('table-view');
const logoutBtn = document.getElementById('logout-btn');
const landingPage = document.getElementById('landing-page');

// Show login modal when logo is clicked
logoContainer.addEventListener('click', () => {
    loginModal.classList.add('show');
});

// Close modal when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
        errorMessage.textContent = '';
        loginForm.reset();
    }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate credentials
    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
        // Successful login
        errorMessage.textContent = '';
        loginModal.classList.remove('show');
        logoContainer.style.display = 'none';
        landingPage.classList.add('faded');
        tableView.classList.add('show');
        loginForm.reset();
    } else {
        // Failed login
        errorMessage.textContent = 'Invalid username or password';
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    tableView.classList.remove('show');
    landingPage.classList.remove('faded');
    logoContainer.style.display = 'block';
});
