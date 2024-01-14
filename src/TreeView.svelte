<script>

    import {onMount} from "svelte";
	import {setContext} from 'svelte';
	import TreeViewNode from "./TreeViewNode.svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();	

    export let root = {};
    
    export let nodeTemplate;

    export let childrenAccessor;
    
    export let filter = null;

	export let nodeId;

	export let selectable;

	export let emptyTreeMessage;
    
    let search;
    
    let currentRoot;

		let selection = {}

		const getAllChildren = (n) => {
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

</script>

<input type="text" bind:value={search}/>
{#if currentRoot}	
	<TreeViewNode  {nodeId} {selectable} node={currentRoot} nodeTemplate={nodeTemplate} childAccessor={childrenAccessor}/>
{:else}
	{#if emptyTreeMessage}
		<span style="font-style:italic;display:block">{emptyTreeMessage}</span>
	{:else}
	<span style="font-style:italic;display:block">empty</span>
	{/if}
{/if}