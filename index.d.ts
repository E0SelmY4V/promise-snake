import '';

declare global {
	interface Promise<T> {
		next<T>(executor: Promise.Executor<T>): Promise<T>;
	}
	interface PromiseConstructor {
		snake(executors: readonly Promise.Executor<void>[]): Promise<void>;
	}
	namespace Promise {
		type Executor<T> = (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
	}
}
