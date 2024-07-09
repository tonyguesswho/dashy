import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendVerificationEmail = async (email: string, token: string) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM!, // Use the email address you verified with SendGrid
    subject: 'Verify your email',
    text: `Please verify your email by clicking on this link: ${process.env.APP_URL}/auth/verify-email/${token}`,
    html: `<p>Please verify your email by clicking on this link: <a href="${process.env.APP_URL}/auth/verify-email/${token}">Verify Email</a></p>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email', error);
    throw new Error('Error sending verification email');
  }
};
