import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import os from 'os';
import path from 'path';
import winston from 'winston';
import { tokenExpirationDuration } from '../constants/index.js';
export function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    secure: true,
  });
}

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: tokenExpirationDuration,
  });
};

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

// Create Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join('logs', 'errors.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join('logs', 'requests.log'),
      level: 'info',
    }),
  ],
});
export { generateToken, ipAddress, logger };
