import config from '@/config';
import nodemailer from 'nodemailer';

export const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.app_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: `"cravo" <${config.email}>`,
    to: email,
    subject: 'Reset Password Link',
    html,
  });

  return info;
};
