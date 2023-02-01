import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
const newUser = async (req, res) => {
  // Show error messages of express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Verify is user is already registered
  const { email, password } = req.body;
  let user = await Users.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'User is already registered' });
  }

  // Create new User
  user = await new Users(req.body);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    await user.save();
    res.json({ msg: 'User Created Succesfully' });
  } catch (error) {
    console.log(error);
  }
};

export { newUser };
