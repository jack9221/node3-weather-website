const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=fd8b3655e9463092f3846e24ae7b636a&query=' +
		encodeURI(latitude) +
		',' +
		encodeURI(longitude) +
		',' +
		'&units=m';
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					'. It is currently ' +
					body.current.temperature +
					' degrees out. It feels like ' +
					body.current.feelslike +
					' degrees out.' +
					'The wind direction is ' +
					body.current.wind_dir
			);
		}
	});
};

module.exports = forecast;
