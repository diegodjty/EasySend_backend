import express from 'express';
const router = express.Router();
import { newUser } from '../controllers/userControllers.js';
import { check } from 'express-validator';

router.post(
  '/',
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Add a Valid Email').isEmail(),
    check('password', 'Password shoulb be at least 6 Charaters').isLength({
      min: 6,
    }),
  ],
  newUser
);

export default router;
