const twilioSID = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const mongoUrl = process.env.MONGODB_URI;
const twilioSenderPhoneNumber = process.env.TWILIO_SENDER_PHONE_NUMBER;

export { mongoUrl, twilioAuthToken, twilioSID, twilioSenderPhoneNumber };
