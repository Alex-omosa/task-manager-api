const jwt = require('jsonwebtoken');

const mufunction = async () => {
  const token = jwt.sign({ _id: '1234' }, 'AnyStringWouldWork', {
    expiresIn: '7 days',
  });
  console.log(token);
  const data = jwt.verify(token, 'AnyStringWouldWork');
  console.log(data);
};

mufunction();
