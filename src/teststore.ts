import { writable } from 'svelte/store';
import {Disney} from './data'

export const selectedNode = writable({id:undefined,name:undefined});

selectedNode.subscribe((selection) => {
}); 

selectedNode.update((selection) => selection); 