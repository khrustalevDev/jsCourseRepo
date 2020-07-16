'use strict';

const box = document.getElementById('box');

console.log(box);

const buttons = document.getElementsByTagName('button')[1];

console.log(buttons);

const circles = document.getElementsByClassName('circle');

console.log(circles);

const hearts = document.querySelectorAll('.heart');

hearts.forEach(item => {
    console.log(item);
});

const heart = document.querySelector('.heart');

console.log(heart);