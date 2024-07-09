/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { validatePassword, generateVerificationToken } from '../utils';

// import { sendVerificationEmail } from '../services/emailService';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Password must contain at least 8 characters, including lowercase and uppercase letters, a number, and a special character',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name: name || null,
      authProvider: 'local',
    });

    // Generate verification token
    const verificationToken = generateVerificationToken(user.id);

    // Send verification email
    // await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: 'User created successfully. Please check your email to verify your account.',
      tok: verificationToken,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};
