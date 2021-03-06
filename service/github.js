const errors = require('request-promise/errors');
const request = require('request-promise').defaults({
  baseUrl: 'https://api.github.com',
  json: true,
});

exports.getRepos = (userToken) => (
  request.get({ uri:'/user/repos?visibility=public&per_page=100',
    headers: {
      'Authorization': `token ${userToken}`,
      'User-Agent': 'ziprecruiter-app',
    }
  })
);