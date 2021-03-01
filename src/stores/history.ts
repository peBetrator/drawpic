import { Writable, writable } from 'svelte/store';

export const history: Writable<ImageData[]> = writable([]);
