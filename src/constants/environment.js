const twilioSID = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const mongoUrl = process.env.MONGODB_URI;
const twilioSenderPhoneNumber = process.env.TWILIO_SENDER_PHONE_NUMBER;
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export {
  BACKEND_BASE_URL,
  mongoUrl,
  twilioAuthToken,
  twilioSID,
  twilioSenderPhoneNumber,
};
