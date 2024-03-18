/**
 * Checks if the given string is a valid email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns true if the email is valid, otherwise false.
 */
const isValidEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex pattern
    return emailRegex.test(email);
};

/**
 * Checks if the given string is a valid password.
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} Returns true if the password is valid, otherwise false.
 */
const isValidPassword = (password) => {
    // Regular expression pattern for validating passwords
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Test the password against the regex pattern
    return passwordRegex.test(password);
};

module.exports = {
    isValidEmail,
    isValidPassword
};
