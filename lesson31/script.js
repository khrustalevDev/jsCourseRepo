const btn = document.querySelector('button');

// btn.onclick = function () {
//     alert('Click');
// };

let i = 0;
const deleteElement = (e) => {
    console.log(e.target);

};

btn.addEventListener('click', deleteElement);
btn.removeEventListener('click', deleteElement);


const link = document.querySelector('a');

let counter = 0;
link.addEventListener('click', (event) => {
    event.preventDefault();
    counter++;
    console.log(counter);
});