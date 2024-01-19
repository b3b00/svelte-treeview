<script lang="ts" generics="T,S = string">

    import {onMount} from "svelte";
	import {setContext} from 'svelte';
	import TreeViewNode from "./TreeViewNode.svelte";	
	import { createEventDispatcher } from 'svelte';


	class CustomEvent<T> extends Event{
		detail:T;
		type:string;
	}
	
	const dispatch = createEventDispatcher<{ "selectionChanged": T[] }>();
  

    export let root:T = undefined;
    
    export let nodeTemplate;

	export let searchTemplate = undefined;

    export let childrenAccessor:(n:T) => T[];
    
    export let filter : (n:T, pattern:string)=> boolean;

	export let nodeId:(n:T) => any;

	export let selectable : boolean = false;

	export let emptyTreeMessage : string;
    
	export let ref: string = "$xirglub!";

    let search : string;

    let complexSearch: S; 

	export let complexFilter: (n:T, searchPattern:S) => boolean = undefined;

    let currentRoot;

		let selection = {}

	let selectNode = (selectedNode, selected) => {
		selection[nodeId(selectedNode)] = selected;	
		let allNodes = getAllChildren(currentRoot);
		let selectedNodes = allNodes.filter(x => isNodeSelected(x));		
		dispatch('selectionChanged',selectedNodes);	
	}

	let nodefilter = (node, search) => {
		if (search === undefined || search === null || search == '') {
			return node;
		}
		var children = childrenAccessor(node);
		if (children.length > 0) {
			var filtered = children.map(x => nodefilter(x, search)).filter(x => x!= null);
			if ( filter(node,search)) {
				return node;
			}
			else if (filtered.length > 0) {
				return {name:node.name,
							 id:node.id,
							 children:filtered 
							 };
			}
			return null;
		}
		else {
			if (filter(node,search)) {
				return node;
			}
			return null;
		}
	}  

	let complexNodefilter = (node:T, search:S) => {
		if (search === undefined || search === null || search == '') {
			return node;
		}
		var children = childrenAccessor(node);
		if (children.length > 0) {
			var filtered = children.map(x => nodefilter(x, search)).filter(x => x!= null);
			if ( complexFilter(node,search)) {
				return node;
			}
			else if (filtered.length > 0) {
				return {name:node.name,
							 id:node.id,
							 children:filtered 
							 };
			}
			return null;
		}
		else {
			if (complexFilter(node,search)) {
				return node;
			}
			return null;
		}
	}  

	let onComplexFilterChanged = (e:CustomEvent<S>) => {
		currentRoot = complexFilter(root,e.detail);
	}

	let getNodeSelection = () => selection;

	let isNodeSelected = (node) => {		
		const id = nodeId(node);
		if (selection.hasOwnProperty(id)) {
			return selection[id]
		}		
		return false;
	}
	
	setContext('selectNode', selectNode);

	setContext('getNodeSelection', getNodeSelection);

	setContext('isNodeSelected', isNodeSelected);
    
    $:{        
        search = search;
		
        if (filter) {			
            currentRoot = nodefilter(root, search);
			console.log(currentRoot);
        }        
    }

    onMount(async () => {
        currentRoot = root;
    })

	const getAllChildren = (n:T):T[] => {
		let children = childrenAccessor(n);
		let isnode = children && Array.isArray(children) && children.length > 0; 
		if (isnode) {				
			const subs = children.map(getAllChildren).reduce(function(a, b){ return a.concat(b); }, [n]);
			return subs;
		}
		else {
			return [n];
		}
	}

</script>

{#if filter && !complexFilter}
	<input type="text" bind:value={search}/>
{/if}
{#if complexFilter}
	<svelte:component this={searchTemplate} on:filterChanged={onComplexFilterChanged}/>
{/if}

{#if currentRoot}	
	<TreeViewNode {ref} {nodeId} {selectable} node={currentRoot} nodeTemplate={nodeTemplate} childAccessor={childrenAccessor}/>
{:else}
	{#if emptyTreeMessage}
		<span style="font-style:italic;display:block">{emptyTreeMessage}</span>
	{:else}
	<span style="font-style:italic;display:block">empty</span>
	{/if}
{/if}