const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { sequelize } = require('./models');

const recruitRouter = require('./routes/recruits');

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3002);
sequelize.sync({ force: false })
  .then(() => {
    console.log('✅ Database connect!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', recruitRouter);

// 404
app.use('*', (req, res, next) => {
  res.sendStatus(404);
});

// error
app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
})

app.listen(app.get('port'), () => {
  console.log(`✅ Serving on port ${app.get('port')}`);
});