'use strict';

const obj = {

    a: 5,
    b: 1
};

const clone = Object.assign({}, obj);

clone.b = 20;

console.log('obj: ', obj);
console.log('clone: ', clone);

const video = ['youtube', 'vimeo', 'rutube'],
    blogs = ['vk', 'blogger', 'livejournal'],
    internet = [...video, ...blogs, 'facebook', 'insta'];

console.log(internet);

function log(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

const num = [2, 3, 4];

log(...num);

const array = ['a', 'b'];

const newArray = [...array];

const test = {
    one: 1,
    two: 2
};

const newObj = {...test };

console.log('newObj: ', newObj);