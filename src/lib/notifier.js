const api = require('./api');
const config = require('../config');

const smsAPI = 'https://api.msg91.com/api/v2/sendsms';
const emailAPI = 'https://control.msg91.com/api/sendmail.php';

async function sendSMS(message, from = 'SMCITY', to, country = 91) {
  const url = `${smsAPI}?country=${country}`;
  const postBody = {
    sender: from,
    route: '4',
    country: '91',
    sms: to.map(recipientNumber => ({
      message,
      to: [recipientNumber],
    })),
  };

  const response = await api.post(url, postBody, {
    authkey: config.authKey,
    'content-type': 'application/json',
  });

  console.log(response);
}

async function sendEmail(message, subject, from = 'no-reply@indiawasteexchange.com', to) {
  console.log(arguments);
  const url = `${emailAPI}?authkey=${config.authKey}
                          &to=${to}
                          &from=${from}
                          &body=${message}
                          &subject=${subject}`;

  const response = await api.post(url);

  console.log(response);
}

module.exports = {
  sendSMS,
  sendEmail,
};
