require('dotenv').config();
const got = require('got');
const logger = require('./log.helper');
const genterateOtp = () => Math.floor(1000 + Math.random() * 9000);

const sendOtpSms = async (otp, phno) => {
  const authorization = process.env.SMS_AUTHORIZATION;
  const url =
    'https://www.fast2sms.com/dev/bulkV2?authorization=' +
    authorization +
    '&route=otp&variables_values=' +
    otp +
    '&flash=0&numbers=' +
    phno;
  await got(url);
};

const logError = error => {
  logger.email.error(error);
};

module.exports = {
  genterateOtp,
  sendOtpSms,
  logError,
};
