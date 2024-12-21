const twilioSID = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const mongoUrl = process.env.MONGODB_URI;
const twilioSenderPhoneNumber = process.env.TWILIO_SENDER_PHONE_NUMBER;
const PORT = process.env.PORT || 4000;
export { PORT, mongoUrl, twilioAuthToken, twilioSID, twilioSenderPhoneNumber };
