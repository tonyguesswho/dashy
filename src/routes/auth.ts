// src/routes/auth.ts
import express from 'express';
import { signUp } from '../controllers/authController';
import { validateSchema } from '../middlewares/validationMiddleware';
import { signupSchema } from '../validators/authValidators';

const router = express.Router();

router.post('/signup', validateSchema(signupSchema), signUp);
// router.post('/signin', signin);
// router.post('/google', googleAuth);
// router.get('/verify-email/:token', verifyEmail);

export default router;
