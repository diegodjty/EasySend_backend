import express from 'express';
const router = express.Router();
import {
  uploadFile,
  deleteFile,
  download,
} from '../controllers/filesControllers.js';
import auth from '../middleware/auth.js';

router.post('/', auth, uploadFile);

router.get('/:file', download, deleteFile);

export default router;
