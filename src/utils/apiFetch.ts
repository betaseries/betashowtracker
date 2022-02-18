import config from '../../config';
import { tokenStore } from '../../src/stores';
const apiKey = import.meta.env.VITE_API_KEY as string;

let token: string;
tokenStore.subscribe((value) => {
	token = value;
});
export const apiFetch = (url:string) => {
	return new Promise((resolve, reject) =>{fetch(config.api + url, {
		method: "GET",
		headers: new Headers({
			"X-BetaSeries-Key": apiKey,
			"X-BetaSeries-Token": token,
		}),
	})
		.then((res) => res.json())
		.then((resp) => resolve(resp))
		.catch(err => reject({error: err}))})
}
export const apiFetchPost = (url:string, body: any = {}) => {
	return new Promise((resolve, reject) =>{fetch(config.api + url, {
		method: "POST",
		headers: new Headers({
			"X-BetaSeries-Key": apiKey,
			"X-BetaSeries-Token": token,
		}),
		body,
	})
		.then((res) => res.json())
		.then((resp) => resolve(resp))
		.catch(err => reject({error: err}))})
}

export const  apiFetchDelete = (url:string) => {
	return new Promise((resolve, reject) =>{fetch(config.api + url, {
		method: "DELETE",
		headers: new Headers({
			"X-BetaSeries-Key": apiKey,
			"X-BetaSeries-Token": token,
		}),
	})
		.then((res) => res.json())
		.then((resp) => resolve(resp))
		.catch(err => reject({error: err}))})
}

