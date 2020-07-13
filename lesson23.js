'use strict';

const car = {
    engine: 'petrol',
    power: 400,
    transmission: 'auto',
    drive: 'awd',
    type: 'coupe',
    horn: function() {
        console.log('Beeeep');
    },
    startupSound: function() {
        console.log('Brruuumm');
    }
};

let newMercedesC = Object.create(car);

newMercedesC = {
    drive: 'rwd',
    power: 640,
    heyMercedes: function(driverName) {
        console.log(`Hello ${driverName}! Where are we going?`);
    }
};

newMercedesC.heyMercedes('Ivan');

console.log(Object.keys(newMercedesC));