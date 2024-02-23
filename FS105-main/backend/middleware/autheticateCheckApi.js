import dotenv from 'dotenv';

// Load environment variables from your .env file
dotenv.config();

// Middleware CheckPassword

const checkPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === process.env.AUTHENTICATEAPI) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };


export default checkPassword;