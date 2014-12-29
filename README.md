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

## Wiring

![](https://lh6.googleusercontent.com/-rouT78pE2_U/VKG0f_RF3QI/AAAAAAAALpQ/B_sAqWNMatE/w926-h521-no/20141229_110637.jpg)
![](https://lh4.googleusercontent.com/-2mD7RGs3eyU/VKG0eyNzfbI/AAAAAAAALpE/_NUo1dzSxsE/w926-h521-no/20141229_110617.jpg)

The thermocouple talks over [SPI](https://github.com/tessel/docs/blob/master/tutorials/communication-protocols.md#spi), so we need to connect chip select, clock, and data, as well as power and ground. From the thermocouple amplifier to Tessel's GPIO bank:
  * Vin > 3.3V (power)
  * 3Vo > nothing, we don't need this one
  * GND > GND (ground)
  * DO > MISO (this is data from the thermocouple coming in to Tessel)
  * CS > TX/G1 (chip select– we're using a digital GPIO pin to tell the amplifier when we're talking to it)
  * CLK > SCK (different names for the clock pin)

## License

MIT
