import fetchShim from '@dojo/framework/shim/fetch';

export interface FetchOptions<T = any> {
	method?:
		| 'GET'
		| 'POST'
		| 'PUT'
		| 'PATCH'
		| 'DELETE'
		| 'get'
		| 'post'
		| 'put'
		| 'patch'
		| 'delete';
	body?: any;
	errorMessage?: ((response: any) => string) | string;
	errorHandler?: (response: Response) => T;
	abortHandler?: (abort: () => void) => void;
}

export async function fetch<T>(url: string, options: FetchOptions<T> = {}): Promise<any> {
    const rawResponse = await fetchShim(url, {
        method: 'GET',
        ...options
    })
    return await rawResponse.json();
}