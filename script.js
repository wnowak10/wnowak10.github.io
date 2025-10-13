// Passcode
const PASSCODE = 'cdncf25';
const STORAGE_KEY = 'cadence_authenticated';

// Get elements
const logoContainer = document.getElementById('logo-container');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const tableView = document.getElementById('table-view');
const landingPage = document.getElementById('landing-page');
const backgroundImage = document.querySelector('.background-image');

// Check if user is already authenticated
const isAuthenticated = localStorage.getItem(STORAGE_KEY) === 'true';

// Function to show table
function showTable() {
    logoContainer.style.display = 'none';
    landingPage.classList.add('faded');
    // Small delay to allow display change to take effect
    setTimeout(() => {
        tableView.classList.add('show');
    }, 10);
}

// Function to close table
function closeTable() {
    tableView.classList.remove('show');
    // Wait for opacity transition before hiding
    setTimeout(() => {
        landingPage.classList.remove('faded');
        logoContainer.style.display = 'block';
    }, 300);
}

// Logo click handler
logoContainer.addEventListener('click', () => {
    if (isAuthenticated) {
        // Already authenticated, show table directly
        showTable();
    } else {
        // Not authenticated, show login modal
        loginModal.classList.add('show');
    }
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

    const password = document.getElementById('password').value;

    // Validate passcode
    if (password === PASSCODE) {
        // Successful login - save to localStorage
        localStorage.setItem(STORAGE_KEY, 'true');
        errorMessage.textContent = '';
        loginModal.classList.remove('show');
        showTable();
        loginForm.reset();
    } else {
        // Failed login
        errorMessage.textContent = 'Invalid passcode';
    }
});

// Handle clicking outside table to close
tableView.addEventListener('click', (e) => {
    // Close if clicking on the table-view overlay (not on the table container itself)
    if (e.target === tableView) {
        closeTable();
    }
});

// Handle background image click to close table
backgroundImage.addEventListener('click', () => {
    if (tableView.classList.contains('show')) {
        closeTable();
    }
});

// Handle ESC key to close table
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tableView.classList.contains('show')) {
        closeTable();
    }
});

// Table sorting functionality
let sortDirection = {
    name: 'asc',
    edition: 'asc'
};

const tableBody = document.getElementById('table-body');
const sortableHeaders = document.querySelectorAll('.sortable');

sortableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const sortKey = header.getAttribute('data-sort');
        sortTable(sortKey);
        updateSortIcons(header, sortKey);
    });
});

function sortTable(key) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        let aValue, bValue;

        if (key === 'name') {
            aValue = a.cells[0].textContent.trim();
            bValue = b.cells[0].textContent.trim();
        } else if (key === 'edition') {
            aValue = a.cells[2].textContent.trim();
            bValue = b.cells[2].textContent.trim();
        }

        if (sortDirection[key] === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });

    // Toggle sort direction for next click
    sortDirection[key] = sortDirection[key] === 'asc' ? 'desc' : 'asc';

    // Re-append sorted rows
    rows.forEach(row => tableBody.appendChild(row));
}

function updateSortIcons(activeHeader, sortKey) {
    // Clear all sort icons
    document.querySelectorAll('.sort-icon').forEach(icon => {
        icon.textContent = '';
    });

    // Set active sort icon
    const icon = activeHeader.querySelector('.sort-icon');
    icon.textContent = sortDirection[sortKey] === 'desc' ? ' ↑' : ' ↓';
}

// Initial sort by name on page load
window.addEventListener('DOMContentLoaded', () => {
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const aValue = a.cells[0].textContent.trim();
        const bValue = b.cells[0].textContent.trim();
        return aValue.localeCompare(bValue);
    });

    rows.forEach(row => tableBody.appendChild(row));

    // Set the sort icon for the name column
    const nameHeader = document.querySelector('[data-sort="name"]');
    const icon = nameHeader.querySelector('.sort-icon');
    icon.textContent = ' ↓';
});
