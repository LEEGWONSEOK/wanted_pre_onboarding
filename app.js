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
  res.send('404 not found')
});

app.use((err, req, res, next) => {
  res.locals.message
})

app.listen(app.get('port'), () => {
  console.log(`✅ Serving on port ${app.get('port')}`);
});