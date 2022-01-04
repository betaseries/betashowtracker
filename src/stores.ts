import { writable } from 'svelte/store';

export const tokenStore = writable(localStorage.getItem("tokenStore"));
export const showsStore = writable();