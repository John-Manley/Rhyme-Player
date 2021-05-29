import { writable } from "svelte/store";

export const songsArray = writable<object[]>(null);
export const player = writable(null);
export const songViewInfo = writable<object>(null);
