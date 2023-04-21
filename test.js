require('.');
Promise.thens([
	() => 1,
	null,
]).then(n => console.log(n));
[1, 2, 3].mapAsync(function (n) {
	console.log(1, this.gg)
}, {gg:123});
[1, 2, 3].forEachAsync(function (n) {
	console.log(2, this.gg)
}, {gg:123});