const { sequelize } = require('./models');

sequelize.sync({ force: true })
  .then(() => {
    console.log('✓ Database Initialize!');
  })
  .catch((err) => {
    console.log(err);
  });