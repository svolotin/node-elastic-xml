if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const axios = require('axios');
const oauth = process.env.OAUTH2_URL;
const digest = Buffer.from(process.env.OAUTH_ACCESS_KEY + ':' + process.env.OAUTH_SECRET).toString('base64');

const logger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

async function auth(request, response, next) {
  if (request.headers.authorization && request.headers.authorization.toLowerCase().startsWith('bearer ')) {
    const start = Date.now();
    try {
      const token = 'token=' + request.headers.authorization.substring(7);
      const resp = await axios.post(oauth, token, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + digest,
          'Accept': 'application/json'
        }
      });
      if (resp.data.active) {
        const end = Date.now();
        console.log('Successful auth. Time spent for oauth call: ', end - start);
        next();
      } else {
        response.status(401).send({ error: 'Unauthorized!' });
      }
    } catch (error) {
      console.log('authentication failed', error);
      response.status(500).send({ error: 'authentication failed!' });
    }
  } else {
    response.status(401).send({ error: 'Unauthorized!' });
  }
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  logger,
  error,
  auth
};