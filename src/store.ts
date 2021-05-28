import { writable } from "svelte/store";

export const player = writable(null);
export const songViewInfo = writable<object>(null);
