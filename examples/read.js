// http://www.adafruit.com/products/269
// http://datasheets.maximintegrated.com/en/ds/MAX31855.pdf

var tessel = require('tessel');
var thermocouplelib = require('../');

var sensor = thermocouplelib.use(tessel.port['GPIO'], {
	cs: 0,
	poll: 10
});

sensor.on('measurement', function (data) {
	console.log(data);
})
