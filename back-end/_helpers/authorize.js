const expressJwt = require('express-jwt');
const { secret } = require('../topSecret/secret.json');

module.exports = authorize;

function authorize(roles = []) {

    

    return expressJwt({ secret }).unless({
        path: [
            // Public routes that don't require authentication
            '/jwt/authenticate',
            '/jwt/',
            '/api/Users/',
            '/api/Users/email'
        ]
    });


    
 /*    // Roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // Authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret }),

        // Authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // User's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Authentication and authorization successful
            next();
        }
    ]; */
}