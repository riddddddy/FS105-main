import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from your .env file
dotenv.config();

// Access your JWT secret from the environment variables using the name you've given
const jwtSecret = process.env.SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is sent in a cookie
  if (token == null) return res.sendStatus(401); // if there's no token

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // if the token is invalid
    req.user = user; // Add the user payload to the request
    next(); // Move to the next middleware or route handler
  });
};

export default authenticateToken;
