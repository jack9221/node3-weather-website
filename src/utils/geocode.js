const request = require('postman-request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURI(address) +
		'.json?access_token=pk.eyJ1IjoiamFjazkyMjEiLCJhIjoiY2tiMXliaXViMDYyNTJ6cDc0NjJ6dDBraSJ9.Zx7RaC61BzF_spnUAYZXag&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
