const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();

const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('*', (req, res) => {
  res.status(404).send(`Route ${req.originalUrl} is not defined !!🙉👀`);
});
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
