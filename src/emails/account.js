const sgmail = require('@sendgrid/mail');

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (name, email) => {
  const msg = {
    to: email,
    from: 'alexomosa001@gmail.com',
    subject: `Welcome ${name}`,
    text: `Hello ${name}, let me know how you get along with the app.`,
  };
  sgmail.send(msg);
};
const goodByeEmail = (name, email) => {
  const msg = {
    to: email,
    from: 'alexomosa001@gmail.com',
    subject: `Sorry to see you go ${name}`,
    text: `Goodbye ${name}, is there anything we would have done to have you kept on board `,
  };
  sgmail.send(msg);
};

module.exports = {
  sendWelcomeEmail,
  goodByeEmail,
};
