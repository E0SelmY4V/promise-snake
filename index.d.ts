import '';

/**
 * Continuous asynchronous operation for ES6 Promise
 * @module promise-snake
 * @license MIT
 * @link https://github.com/E0SelmY4V/promise-snake
 */
declare module 'promise-snake';

declare global {
	interface Promise<T> {
		/**
		 * Create another Promise when this Promise has been resolved.
		 * @param executor The callback used to initialize 'another Promise'.
		 */
		next<T>(executor: Promise.Executor<T>): Promise<T>;
		/**
		 * Create promises one by one to do asynchronous operations when this
		 * Promise has been resolved.
		 * @param executors Callbacks used to initialize the promises.
		 */
		snake(executors: readonly Promise.Executor<void>[]): Promise<void>;
	}
	interface PromiseConstructor {
		/**
		 * Create a Promise, just like {@link PromiseConstructor}.
		 * @param executor The callback used to initialize the Promise.
		 */
		next<T>(executor: Promise.Executor<T>): Promise<T>;
		/**
		 * Create promises one by one to do asynchronous operations.
		 * @param executors Callbacks used to initialize the promises.
		 */
		snake(executors: readonly Promise.Executor<void>[]): Promise<void>;
	}
	namespace Promise {
		/**
		 * The `executor` argument of {@link PromiseConstructor}.
		 *
		 * Callbacks used to initialize the promise. This type of callback is
		 * passed two arguments: a resolve callback used to resolve the promise
		 * with a value or the result of another promise, and a reject callback
		 * used to reject the promise with a provided reason or error.
		 */
		type Executor<T> = (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
	}
}
