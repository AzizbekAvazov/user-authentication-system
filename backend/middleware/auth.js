const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer')[1];
        if (token) {
            try {
                // return user if the token is valid
                return jwt.verify(token, jwtSecret);
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]'");
    }
    throw new Error('Authorization header must be provided');
};
