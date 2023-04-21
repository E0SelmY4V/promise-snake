require('.');
Promise.thens([
	() => 1,
	null,
]).then(n => console.log(n));