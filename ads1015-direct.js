//Testing read-out from the TeVoX2 RPI Hat voltmeter
//For this test I'm using the ADS1015 continuous single channel read-out on chanel 3(AIN3)
//I'm actully not sure this is how it's suppose to be done. Nevertheless, it would need some callibration to be a little more precise.
//Reading 3.3V with a multimeter, I'm getting roughtly a 0.1V lower reading.

//Using this lib : https://www.npmjs.com/package/raspi-kit-ads1x15

"use strict";

const Raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;
const ADS1x15 = require('raspi-kit-ads1x15');



// Init Raspi
Raspi.init(() => {

    // Init Raspi-I2c
    const i2c = new I2C();

    // Init the ADC
    const adc = new ADS1x15({
        i2c,                                    // i2c interface
        chip: ADS1x15.chips.IC_ADS1015,         // chip model
        address: ADS1x15.address.ADDRESS_0x48,  // i2c address on the bus

        // Defaults for future readings
        pga: ADS1x15.pga.PGA_4_096V,            // power-gain-amplifier range
        sps: ADS1x15.spsADS1015.SPS_250         // data rate (samples per second)
    });

    adc.startContinuousChannel(ADS1x15.channel.CHANNEL_3, (err, value, volts) => {
    if (err) {
        console.error('Failed to fetch value from ADC', err);
    } else {
        console.log('Channel 3');
        console.log(' * Value:', value);    // will be a 11 or 15 bit integer depending on chip
        console.log(' * Volts:', volts);    // voltage reading factoring in the PGA
    }

    // From here on, call adc.getLastReading(...) for future readings and to clear latched alerts
  	setInterval(function testing(){

    	console.log('hello');
    	adc.getLastReading((err, value, volts) => {
        if (err) {
            console.error('Failed to fetch value from ADC', err);
        } else {
            console.log(' * Value:', value);    // will be a 11 or 15 bit integer depending on chip
            console.log(' * Volts:', volts);    // voltage reading factoring in the PGA
        }
      });
   }, 1000);

  // When done, call adc.stopContinuousReadings(...) to stop the chip readings

  });
});
