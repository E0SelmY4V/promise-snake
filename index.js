/**
 * Continuous asynchronous operation for ES6 Promise
 * @module promise-snake
 * @license MIT
 * @link https://github.com/E0SelmY4V/promise-snake
 */
"use strict";

Promise.prototype.next = function (executor) {
	return this.then(() => new Promise(executor));
};

Promise.snake = (executors) => {
	let promise = Promise.resolve();
	executors.forEach(executor => promise = promise.next(executor));
	return promise;
};
