// localStorage.setItem('hero', 'thor');
// localStorage.setItem('toDo', 'Study ModaFukka');
let x = localStorage.getItem('hero');
console.log(x);
console.log(localStorage.getItem('toDo'));


//localStorage.setItem('toDo', 'Get a job')
console.log(localStorage.getItem('toDo'));

localStorage.removeItem('toDo');
let y = localStorage.getItem('hero');
console.log(y);

localStorage.clear();