
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Thermocouple (hardware, opts) {
  opts = opts || {};

  this.spi = new hardware.SPI({
    mode: 0,
    clockRate: 5e6, // 5Mhz
    chipSelect: typeof opts.cs == 'object' ? opts.cs : hardware.digital[opts.cs || 0],
  });

  if (opts.poll) {
    var self = this;
    this._pollid = setTimeout(function loop () {
      // Emit data events forever.
      self.read(function () {
        setTimeout(loop, opts.poll);
      })
    }, opts.poll);
  }
}

util.inherits(Thermocouple, EventEmitter);

Thermocouple.prototype.read = function (next) {
  var self = this;
  this.spi.receive(4, function (err, buf) {
    if (err) return next(err);

    // Read entire bit field.
    var value = buf.readUInt32BE(0);

    var res = {
      openCircuit: value & (1 << 0),
      shortGND: value & (1 << 1),
      shortVCC: value & (1 << 2),
      fault: value & (1 << 16),
    }

    // Read internal.
    var internal = (value >> 4) & 0x7FF;
    // check sign bit!
    if (value & (1 << 15)) {
      // Convert to negative value by extending sign and casting to signed type.
      internal = 0xF800 | internal;
    }
    internal *= 0.0625; // LSB = 0.0625 degrees

    // Read temperature.
    var temp;
    if (value & (1 << 31)) {
      // Negative value, drop the lower 18 bits and explicitly extend sign bits.
      temp = 0xFFFFC000 | ((value >> 18) & 0x003FFFF);
    } else {
      // Positive value, just drop the lower 18 bits.
      temp = value >> 18;
    }
    temp *= 0.25; // LSB = 0.25 deg C

    var fahrenheit = ((temp * 9)/5) + 32

    res.internal = internal;
    res.celsius = temp;
    res.fahrenheit = fahrenheit;

    next(err, res);
    self.emit('measurement', res);
  })
}

function use (hardware, opts) {
  return new Thermocouple(hardware, opts);
}

exports.Thermocouple = Thermocouple;
exports.use = use;
