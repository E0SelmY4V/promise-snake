/**
 * Continuous asynchronous operation for ES6 Promise
 * @module promise-snake
 * @version 1.3.2
 * @license MIT
 * @link https://github.com/E0SelmY4V/promise-snake
 */
declare module '.';
declare global {
	interface Promise<T> {
		/**
		 * Create another Promise when this Promise has been resolved.
		 * @param executor The callback used to initialize 'another Promise'.
		 */
		next<T>(executor: Executor<T>): Promise<T>;
		/**
		 * Create promises one by one to do asynchronous operations when this
		 * Promise has been resolved.
		 * @param execustors Callbacks used to initialize the promises.
		 */
		snake(executors: readonly Executor<void>[]): Promise<void>;
		/**
		 * Attaches callbacks for the resolution of the Promise one by one.
		 * @param onfulfilleds The callback list to execute when the Promise is
		 * resolved.
		 */
		thens<K extends Part<(value: any) => any>[]>(onfulfilleds: readonly [...K]): Promise<Awaited<LRtn<K, T>>>;
	}
	interface PromiseConstructor {
		/**
		 * Create a Promise, just like {@link PromiseConstructor}.
		 * @param executor The callback used to initialize the Promise.
		 */
		next<T>(executor: Executor<T>): Promise<T>;
		/**
		 * Create promises one by one to do asynchronous operations.
		 * @param executors Callbacks used to initialize the promises.
		 */
		snake(executors: readonly Executor<void>[]): Promise<void>;
		/**
		 * Do callbacks one by one.
		 * @param onfulfilleds The callback list to execute.
		 */
		thens<K extends Part<(value: any) => any>[]>(onfulfilleds: readonly [...K]): Promise<Awaited<LRtn<K>>>;
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
		interface Executor<T> {
			(resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void): void;
		}
	}
	interface Array<T> {
		/**
		 * Performs the specified action for each element in an array.
		 * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
		 * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
		 */
		forEachAsync(callbackfn: (value: T, index: number, array: T[]) => void | PromiseLike<void>, thisArg?: any): Promise<void>;
		/**
		 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
		 * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
		 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
		 */
		mapAsync<U>(callbackfn: (value: T, index: number, array: T[]) => U | PromiseLike<U>, thisArg?: any): Promise<U[]>;
	}
}

import Executor = Promise.Executor;

type AnyF<P extends AnyT = AnyT, R = any> = (...arg: P) => R;
type AnyT<T = any> = readonly T[];
type Part<T = never> = T | undefined | null;
type Ifer<T, P = never> = T extends readonly [] ? P : T extends AnyT<infer S> ? S : P;
type Last<T extends AnyT> = T extends readonly [...any[], infer N] ? N : Ifer<T, undefined>;
type RepedNil<A, B> = A extends A ? A extends Part ? B : A : never;
type Sure<N, Z, K> = N extends Z ? N : K;
type SWArray<
	S extends AnyT,
	L extends 0 | 1 = 0,
	R extends AnyT = []>
	= (S extends [readonly [infer A, ...infer S], readonly [...infer S, infer A]][L]
		? SWArray<S, L, [[...R, A], [A, ...R]][L]>
		: L extends 0 ? [R, ...SWArray<S, 1>] : [S, R]
	);
type SWTmpl<A extends [AnyT, AnyT, AnyT]> = A;
type NotNil<T, L extends 0 | 1> = T extends Part ? [] : [[T], T[]][L];
type LtdNoNil<
	N extends AnyT,
	R extends AnyT = []>
	= (N extends readonly [infer S, ...infer N]
		? LtdNoNil<N, [...R, ...NotNil<S, 0>]>
		: R
	);
type NoNil<N extends AnyT> = SWArray<N> extends SWTmpl<infer A> ? [...LtdNoNil<A[0]>, ...NotNil<Ifer<A[1], null>, 1>, ...LtdNoNil<A[2]>] : never;
type LRtn<S extends AnyT<Part<AnyF>>, T = void> = ReturnType<Sure<RepedNil<Last<NoNil<S>>, 0>, AnyF, () => T>>;

(() => {
	const pro = (t: Promise<any> | typeof Promise) => t && 'then' in t && typeof t?.then === 'function' ? t : Promise.resolve();

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

	Array.prototype.forEachAsync = async function (callbackfn, thisArg) {
		typeof thisArg !== 'undefined' && (callbackfn = callbackfn.bind(thisArg));
		await Promise.thens(this.map((...args) => () => callbackfn(...args), thisArg));
	};

	Array.prototype.mapAsync = async function (callbackfn, thisArg) {
		typeof thisArg !== 'undefined' && (callbackfn = callbackfn.bind(thisArg));
		const rslt: any[] = [];
		await Promise.thens(this.map((...args) => async () => rslt.push(await callbackfn(...args)), thisArg));
		return rslt;
	};
})();

export { };
