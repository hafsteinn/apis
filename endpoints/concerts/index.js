var request = require('request'),
	cheerio = require('cheerio'),
	_ = require('underscore'),
	app = require('../../server');

app.get('/concerts', function (req, res, next) {
  var url = 'http://midi.is/Home/LoadMoreEventsByDate?eventType=Concerts&pageNumber='
  var page = req.query.page || 1;

  request.get(url + page, function (error, response, body) {
  	if (error || response.statusCode !== 200) {
		return res.json(500,
			{ error: 'Something came up when contacting the midi.is server!'});
	}
	var events = JSON.parse(body);
	var filtered = _.map(events, function(event) {
		return _.pick(event, "eventDateName", "name", "dateOfShow",
			"userGroupName", "eventHallName", "imageSource")
	});
	return res.json({ results: filtered });
  });
});
