module.exports = () => {
  if (process.env.NODE_ENV === 'prod')
    require('dotenv').config({ path: './.env.prod' });
  else if (process.env.NODE_ENV === 'local')
    require('dotenv').config({ path: './.env.local' });
  else require('dotenv').config({ path: './.env.dev' });
};
