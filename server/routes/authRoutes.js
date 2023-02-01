import express from 'express';
const router = express.Router();
import {
  authanticateUser,
  authanticatedUser,
} from '../controllers/authControllers.js';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';

router.post(
  '/',
  [
    check('email', 'Add a valid Email').isEmail(),
    check('password', 'Password cannot be empty').not().isEmpty(),
  ],
  authanticateUser
);
router.get('/', auth, authanticatedUser);

export default router;
