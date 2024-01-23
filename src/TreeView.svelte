<script lang="ts" generics="T extends TVNode,S = string">

    import {onMount} from "svelte";
	import {setContext} from 'svelte';
	import TreeViewNode from "./TreeViewNode.svelte";	
	import { createEventDispatcher } from 'svelte';
	import {CustomEvent, TVNode} from './TreeViewTypes';



	const dispatch = createEventDispatcher<{ "selectionChanged": T[] }>();
  

    export let root:T & TVNode = undefined;
    
    export let nodeTemplate;

	export let searchTemplate = undefined;
    
    export let filter : (n:T & TVNode, pattern:string)=> boolean = undefined;

	export let selectable : boolean = false;

	export let emptyTreeMessage : string;
    
	export let ref: string = "$xirglub!";

    let search : string;

    let complexSearch: S; 

	export let complexFilter: (n:T, searchPattern:S) => boolean = undefined;

    let currentRoot;

		let selection = {}

	let selectNode = (selectedNode:T, selected) => {
		selection[selectedNode.id] = selected;	
		let allNodes = getAllChildren(currentRoot);
		let selectedNodes = allNodes.filter(x => isNodeSelected(x));		
		dispatch('selectionChanged',selectedNodes);	
	}

	let nodefilter = (node:T, search:string) => {
		if (search === undefined || search === null || search == '') {
			return node;
		}
		var children = node.children;
		if (children !== null && children !== undefined && children.length > 0) {
			var filtered = children.map(x => nodefilter(x as T, search)).filter(x => x!= null);
			if ( filter(node,search)) {
				return node;
			}
			else if (filtered.length > 0) {
				let newNode = Object.assign({}, node);
				newNode.children = filtered;				
				return newNode;
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

	let complexNodefilter = (node:T , searchPattern:S) => {		
		if (searchPattern === undefined || searchPattern === null || searchPattern == '') {				
			return node;
		}
		var children = node.children;
		if (children.length > 0) {

			var filtered = children.map(x => complexNodefilter(x as T, searchPattern)).filter(x => x!= null);
			if ( complexFilter(node,searchPattern)) {				
				return node;
			}
			else if (filtered.length > 0) {				
				let newNode = Object.assign({}, node);
				newNode.children = filtered;				
				return newNode;
			}
			return null;
		}
		else {
			if (complexFilter(node,searchPattern)) {				
				return node;
			}
			return null;
		}
	}  

	let onComplexFilterChanged = (e:CustomEvent<S>) => {
		currentRoot = complexNodefilter(root,e.detail);
	}

	let getNodeSelection = () => selection;

	let isNodeSelected = (node:T) => {		
		const id = node.id;
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
        if (filter && !complexFilter) {		
            currentRoot = nodefilter(root, search);						
        }        
    }

    onMount(async () => {
        currentRoot = root;
    })

	const getAllChildren = (n:T):T[] => {
		let children = n.children;
		let isnode = children && Array.isArray(children) && children !== null && children !== undefined && children.length > 0; 
		if (isnode) {				
			const subs = children.map(getAllChildren).reduce(function(a, b){ return a.concat(b); }, [n]);
			return subs;
		}
		else {
			return [n];
		}
	}

</script>
<div style="display:flex;flex-direction:column">
{#if filter && !complexFilter}
	<input type="text" bind:value={search}/>
{/if}
{#if complexFilter}
	<svelte:component this={searchTemplate} on:filterChanged={onComplexFilterChanged}/>
{/if}

{#if currentRoot}	
	<TreeViewNode {ref} {selectable} node={currentRoot} nodeTemplate={nodeTemplate} />
{:else}
	{#if emptyTreeMessage}
		<span style="font-style:italic;display:block">{emptyTreeMessage}</span>
	{:else}
	<span style="font-style:italic;display:block">empty</span>
	{/if}
{/if}
</div>