# thermocouple-max31855

Reads data from the thermocouple amplifier MAX31855. 

```js
var tessel = require('tessel');
var thermocouplelib = require('thermocouple-max31855');

var sensor = thermocouplelib.use(tessel.port['GPIO'], {
	cs: 0,
	poll: 10
});

sensor.on('measurement', function (data) {
	console.log(data);
})
```

## Usage

To install the library:

```
npm install thermocouple-max31855
```

To include it in your code:

```
var thermocouplelib = require('thermocouple-max31855');
var sensor = thermocouplelib.use(port, { /* options */ });
```

&#x20;<a href="#api-sensor-read-function-err-data" name="api-sensor-read-function-err-data">#</a> sensor<b>.read</b>( function (err, data) )  
Create a measurement reading from the thermocouple. Returns data of this structure:

```js
{
 fault : 0,
 fahrenheit : 86.9,
 shortVCC : 0,
 celsius : 30.5,
 internal : 22.0625,
 openCircuit : 0,
 shortGND : 0
}
```

&#x20;<a href="#api-sensor-on-measurement" name="api-sensor-on-measurement">#</a> sensor<b>.on</b>( 'measurement' )  
Every time a reading is made (using the `.read()` function or through the `.poll` option) this event is emitted. See `.read()` for its data structure.

## License

MIT
