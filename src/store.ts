import { writable } from "svelte/store";
import type Player from "./Player";

export const songsArray = writable<object[]>(null);
export const player = writable<Player>(null);
export const songViewInfo = writable<object>(null);
export const currentSong = writable<object>(null);
