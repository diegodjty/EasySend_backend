import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
export default (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (authHeader) {
    // Get Token
    const token = authHeader.split(' ')[1];

    // Check JWT
    try {
      const user = jwt.verify(token, process.env.SECRET);
      req.user = user;
    } catch (error) {
      console.log(error);
    }
  }
  return next();
};
