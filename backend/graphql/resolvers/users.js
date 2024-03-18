const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {isValidEmail, isValidPassword} = require("../../utility/utils");
const jwtSecret = process.env.JWT_SECRET;

const ERROR_CODES = {
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    MISSING_USERNAME: 'MISSING_USERNAME',
    MISSING_EMAIL: 'MISSING_EMAIL',
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    MISSING_PASSWORD: 'MISSING_PASSWORD',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
};

/**
 * Generates a JWT token for user authentication with a specified expiration time.
 * The generated token expires in 2 hours.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} email - The email address of the user.
 * @param {string} username - The username
 * @returns {string} The generated JWT token.
 */
const generateToken = (userId, email, username) => {
    return jwt.sign(
        {user_id: userId, email: email, username: username},
        jwtSecret,
        {
            expiresIn: "2h"
        }
    );
};

/**
 * Registers a new user with the provided username, email, and password.
 * If a user with the same email already exists, an error is thrown.
 *
 * @param {object} _ - The parent object, not used in this function.
 * @param {object} registerInput - The input data containing the username, email, and password.
 * @param {string} registerInput.username - The username of the new user.
 * @param {string} registerInput.email - The email address of the new user.
 * @param {string} registerInput.password - The password of the new user.
 * @returns {object} The registered user data including the unique identifier.
 * @throws {ApolloError} If a user with the same email already exists.
 */
const registerUser = async (_, { registerInput: {username, email, password} }) => {
    if (!username) {
        throw new ApolloError("Please enter your username", ERROR_CODES.MISSING_USERNAME);
    }

    if (!email) {
        throw new ApolloError("Please enter your email", ERROR_CODES.MISSING_EMAIL);
    }

    if (!isValidEmail(email)) {
        throw new ApolloError("Please enter a valid email address", ERROR_CODES.INVALID_EMAIL);
    }

    if (!password) {
        throw new ApolloError("Please enter your password", ERROR_CODES.MISSING_PASSWORD);
    }

    if (!isValidPassword(password)) {
        throw new ApolloError("Password must contain at least 8 characters, including lowercase letter, uppercase letter, and number", ERROR_CODES.INVALID_PASSWORD);
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApolloError(`A user with email ${email} already registered`, ERROR_CODES.USER_ALREADY_EXISTS);
    }

    // Encrypt the password
    var encryptedPassword = await bcrypt.hash(password, 10);
    // Build mongoose model
    const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword
    });

    // Create JWT token for authentication
    newUser.token = generateToken(newUser._id, email, username);
    // Initial values for failedLogins and lastFailAt
    newUser.failedLogins = 0;
    newUser.lastFailAt = null;

    // Save new user to database
    const newUserData = await newUser.save();

    return { id: newUserData.id, ...newUserData._doc };
};

/**
 * Authenticates a user with the provided email and password.
 * If the user is not found or the password is incorrect, appropriate errors are thrown.
 *
 * @param {object} _ - The parent object, not used in this function.
 * @param {object} loginInput - The input data containing the email and password.
 * @param {string} loginInput.email - The email address of the user.
 * @param {string} loginInput.password - The password of the user.
 * @returns {object} The authenticated user data including the unique identifier.
 * @throws {ApolloError} If the user is not found, the account is locked, or the password is incorrect.
 */
const loginUser = async (_, { loginInput: { email, password } }) => {
    if (!email) {
        throw new ApolloError("Please enter your email", ERROR_CODES.MISSING_EMAIL);
    }

    if (!password) {
        throw new ApolloError("Please enter your password", ERROR_CODES.MISSING_PASSWORD);
    }

    // Check if user with this email exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApolloError(`User with email ${email} not found`, ERROR_CODES.USER_NOT_FOUND);
    }

    // User has 5 failed login attempts, the account is locked for 1 hour
    if (user.failedLogins >= 5) {
        const currDate = new Date().getTime();
        const difference = (currDate - user.lastFailAt)/1000;

        // If account lock time is expired, then reset the "failedLogins" and "lastFailAt" properties
        if (difference >= 3600) {
            user.failedLogins = 0;
            user.lastFailAt = null;
            await user.save();
        } else {
            throw new ApolloError('Account is locked. Please try again later', ERROR_CODES.ACCOUNT_LOCKED);
        }
    }

    // Check if the password is correct
    if (await bcrypt.compare(password, user.password)) {
        // Reset failed login attempts count and the last failed login timestamp
        user.failedLogins = 0;
        user.lastFailAt = null;
        user.token = generateToken(user._id, email, user.username);
        await user.save();
        return { id: user.id, ...user._doc };
    } else {
        // Login failed with incorrect password, increment failed login attempts count
        user.failedLogins += 1;
        user.lastFailAt = new Date().getTime();
        await user.save();
        throw new ApolloError('Incorrect password', ERROR_CODES.INCORRECT_PASSWORD);
    }
};

module.exports = {
    Mutation: { registerUser, loginUser },
    Query: {
        user: (_, { ID }) => User.findById(ID)
    }
};
