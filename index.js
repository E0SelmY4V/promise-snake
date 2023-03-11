Promise.prototype.next = function (executor) {
	return this.then(() => new Promise(executor));
};

Promise.snake = (executors) => {
	let promise = Promise.resolve();
	executors.forEach(executor => promise = promise.next(executor));
	return promise;
};
