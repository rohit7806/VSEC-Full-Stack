const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('loginForm');

// Get the individual checklist items
const lengthRule = document.getElementById('length');
const numberRule = document.getElementById('number');
const specialRule = document.getElementById('special');

// Track overall validation status
let isPasswordValid = false;

passwordInput.addEventListener('input', function() {
    const val = passwordInput.value;

    // 1. Check length
    const hasLength = val.length >= 8;
    
    // 2. Check for at least one number
    const hasNumber = /\d/.test(val);
    
    // 3. Check for at least one special character
    const hasSpecial = /[@$!%*?&]/.test(val);

    // Update classes visually based on regex evaluation
    toggleRule(lengthRule, hasLength);
    toggleRule(numberRule, hasNumber);
    toggleRule(specialRule, hasSpecial);

    // Password is only valid if all 3 criteria are true
    isPasswordValid = hasLength && hasNumber && hasSpecial;
});

// Helper function to switch red/green styles
function toggleRule(element, isValid) {
    if (isValid) {
        element.classList.add('valid');
    } else {
        element.classList.remove('valid');
    }
}

// Block submission if any criteria are unfulfilled
loginForm.addEventListener('submit', function(event) {
    if (!isPasswordValid) {
        event.preventDefault();
        alert('Your password does not meet all security requirements.');
    }
});
