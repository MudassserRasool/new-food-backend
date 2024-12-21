import bcrypt from 'bcrypt';
import os from 'os';
// import { ipAddress } from '../utils/helper.js';
import { PORT } from './environment.js';

const emailService = 'gmail';
const emailHost = 'smtp.gmail.com';
const emailPort = 587;
const sixMonthsInSeconds = Math.floor(6 * 30.44 * 24 * 60 * 60);
const tokenExpirationDuration = sixMonthsInSeconds;
const otp = Math.floor(1000 + Math.random() * 9000);

// const otp = 1234;
const salt = await bcrypt.genSalt(10);
const trackingId = Math.floor(Math.random() * 1000000000);

const windowMs = 15 * 60 * 1000;
const maxRequests = 100;
const apiVersion = 'v1.0';

const ipAddress = () => {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress;

  for (const interfaceName in networkInterfaces) {
    const networks = networkInterfaces[interfaceName];

    for (const network of networks) {
      if (network.family === 'IPv4' && !network.internal) {
        ipAddress = network.address;
        break;
      }
    }
    if (ipAddress) break;
  }
  return ipAddress;
};

const BACKEND_BASE_URL = `http://${ipAddress()}:${PORT}`;

export {
  apiVersion,
  BACKEND_BASE_URL,
  emailHost,
  emailPort,
  emailService,
  ipAddress,
  maxRequests,
  otp,
  salt,
  tokenExpirationDuration,
  trackingId,
  windowMs,
};
