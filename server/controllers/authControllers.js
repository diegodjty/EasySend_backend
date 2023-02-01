import Users from '../models/Users.js';
import bcryt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import * as dotenv from 'dotenv';
dotenv.config();
const authanticateUser = async (req, res, next) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check if user is registered
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    res.status(401).json({ msg: 'User dosnt exist' });
    return next();
  }

  // Verify email and password

  if (bcryt.compareSync(password, user.password)) {
    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.SECRET,
      {
        expiresIn: '8h',
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ msg: 'Incorrect password' });
    return next();
  }
};

const authanticatedUser = async (req, res, next) => {
  res.json({ user: req.user });
};

export { authanticateUser, authanticatedUser };
