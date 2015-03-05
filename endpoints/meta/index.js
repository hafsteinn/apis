var _ = require('lodash');
var endpoint = require('apis-endpoint')();
var request = require('request');

module.exports = endpoint;

/**
 * Get the maintainers of the project.
 */
endpoint.get('/maintainers/', function(req, res, fail) {
  var options = {
    url: 'https://api.github.com/orgs/apis-is/public_members',
    headers: {
      'User-Agent': 'apis-is'
    }
  };

  request.get(options, function(err, response, body) {
    if (err) return res.json({error: err});

    var maintainers = _.map(JSON.parse(body), function(n) {
      return _.pick(n, ['login', 'avatar_url', 'url']);
    });

    return res.json(maintainers);
  });
});

/**
 * Get a list of all contributors to the project.
 */
endpoint.get('/contributors/', function(req, res, fail) {
  var options = {
    url: 'https://api.github.com/repos/apis-is/apis/contributors',
    headers: {
      'User-Agent': 'apis-is'
    }
  };

  request.get(options, function(err, response, body) {
    if (err) return res.json({error: err});

    var maintainers = _.map(JSON.parse(body), function(n) {
      return _.pick(n, ['login', 'avatar_url', 'url', 'contributions']);
    });

    return res.json(maintainers);
  });
});

/**
 * Get a list of official sponsors of the project.
 */
endpoint.get('/sponsors/', function(req, res, fail) {
  return res.json({
      'nosponsors': 'No sponsors yet! Contact us at apis@apis.is if you\'re interested!'
    });
});

/**
 * Content for docs about section
 */
endpoint.get('/about/', function(req, res, fail) {
  return res.json({
      'note': [
        "The content needs to be addressed before launch of V2"
      ],
      'what': [
        "API stands for 'Application Programming Interface', literally specifying how software components should interact with each other. In our context, this means we have endpoints that return different kinds of data to developers using JSON objects, allowing them to use and manipulate it for their own applications.",
        "Bottom line is; this service creates a lot of opportunities for developers that don't necessarily have the know-how, time or resources to get the data themselves, but are full of ideas for using it. So if you have an idea that only needs a little more data to become a reality, don't hesitate to contact us or even contribute yourself to our github repository."
      ],
      'how-it-works': [
        "Our servers scrape various websites for the desired information. For more detailed information on individual endpoints visit our github repository and look at the source code."
      ],
      'get-started': [
        "This documentation includes simple jQuery.ajax demos. Feel free to copy these to your projects, but remember that they are provided as is, and you will most certainly have to adjust them to your own needs."
      ],
      'how-free': [
        "APIs.is is completely open source and developed by several contributors working on their own personal time. All this runs in the cloud, available to you at all times."
      ],
      'version-control': [
        "At the moment, including an accept-version header is not necessary, since all endpoints are at version 1, but we strongly recommend it, especially in production environments. Once an endpoint has been updated, the default version to be returned is the most recent, and this documentation will be updated accordingly. Changes in functionality between versions will be outlisted."
      ]
    });
});