import bcrypt from 'bcrypt';

const emailService = 'gmail';
const emailHost = 'smtp.gmail.com';
const emailPort = 587;
const sixMonthsInSeconds = Math.floor(6 * 30.44 * 24 * 60 * 60);
const tokenExpirationDuration = sixMonthsInSeconds;
const otp = Math.floor(1000 + Math.random() * 9000);
const PORT = process.env.PORT || 4000;
// const otp = 1234;
const salt = await bcrypt.genSalt(10);
const trackingId = Math.floor(Math.random() * 1000000000);

const windowMs = 15 * 60 * 1000;
const maxRequests = 100;
const apiVersion = 'v1.0';

export {
  PORT,
  apiVersion,
  emailHost,
  emailPort,
  emailService,
  maxRequests,
  otp,
  salt,
  tokenExpirationDuration,
  trackingId,
  windowMs,
};
