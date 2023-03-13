/**
 * Continuous asynchronous operation for ES6 Promise
 * @module promise-snake
 * @license MIT
 * @link https://github.com/E0SelmY4V/promise-snake
 */
"use strict";

(() => {
	const pro = (t) => typeof t?.then === 'function' ? t : Promise.resolve();

	Promise.prototype.next = Promise.next = function (executor) {
		return pro(this).then(() => new Promise(executor));
	};

	Promise.prototype.snake = Promise.snake = function (executors) {
		let promise = pro(this);
		executors.forEach(executor => promise = promise.next(executor));
		return promise;
	};

	Promise.prototype.thens = Promise.thens = function (onfulfilleds) {
		let promise = pro(this);
		onfulfilleds.forEach(onfulfilled => promise = promise.then(onfulfilled));
		return promise;
	};
})();
