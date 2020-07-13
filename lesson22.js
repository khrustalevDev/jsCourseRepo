'use strict';

const obj = {

    a: 5,
    b: 1
};

const clone = Object.assign({}, obj);

clone.b = 20;

console.log('obj: ', obj);
console.log('clone: ', clone);