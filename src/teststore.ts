import { writable } from 'svelte/store';

export const selectedNode = writable({});

selectedNode.subscribe((selection) => {
}); 

selectedNode.update((selection) => selection); 