import '';

/**
 * Continuous asynchronous operation for ES6 Promise
 * @module promise-snake
 * @license MIT
 * @link https://github.com/E0SelmY4V/promise-snake
 */
declare module 'promise-snake';

type AnyF<P extends AnyT = AnyT, R = any> = (...arg: P) => R
type AnyT<T = any> = readonly T[]
type Last<T> = T extends readonly [...any[], infer N] ? N : void;
type Tail<T> = T extends readonly [...infer N, any] ? N : []
type Part<T> = T | undefined | null;
type Ifer<T, P = never> = T extends AnyT<never> ? P : T extends AnyT<infer S> ? S : P
type Rtn<S extends AnyT<AnyF>, T = void> = ReturnType<Ifer<S, () => T>>
type Rtns<S extends AnyT<AnyF>, R extends AnyT = []> = S extends [AnyF<AnyT, infer E>, ...infer S extends AnyT<AnyF>] ? Rtns<S, [...R, E]> : R
type Gfns<P extends AnyT, R extends AnyT<AnyF> = readonly []> = P extends [infer A, infer B, ...infer P] ? Gfns<[B, ...P], readonly [...R, (value: A) => B]> : R
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
		/**
		 * Attaches callbacks for the resolution of the Promise one by one.
		 * @param onfulfilleds The callback list to execute when the Promise is
		 * resolved.
		 */
		thens<K extends AnyT<AnyF<[value: any]>>>(onfulfilleds: readonly [...K]): Promise<Awaited<Rtn<K, T>>>
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
		/**
		 * Do callbacks one by one.
		 * @param onfulfilleds The callback list to execute.
		 */
		thens<K extends AnyT<AnyF<[value: any]>>>(onfulfilleds: readonly [...K]): Promise<Awaited<Rtn<K>>>
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
