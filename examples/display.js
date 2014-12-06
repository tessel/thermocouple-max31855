var tessel = require('tessel');
var segmentlib = require('display-segment');
var thermocouplelib = require('../');

var led = segmentlib.use(tessel.port['D']);
led.brightness(1.0);

var sensor = thermocouplelib.use(tessel.port['GPIO'], {
	cs: 0,
	poll: 10
});

sensor.on('measurement', function (data) {
	console.log(data);
	led.display(data.fahrenheit, {
		leadingZero: false,
		places: 2,
	});
})
