import { writable } from 'svelte/store';

export const tokenStore = writable(localStorage.getItem("tokenStore"));
export const showsStore = writable();
export const localeStore = writable();
export const serviceSynchroStore = writable();
export const modalStore = writable({open: false, type: "", platform: ""})
