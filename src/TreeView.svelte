<script lang="ts" generics="T">

    import {onMount} from "svelte";
		import {setContext} from 'svelte';
	    import TreeViewNode from "./TreeViewNode.svelte";

    export let root = {};
    
    export let nodeTemplate;

    export let childrenAccessor:(n:T) => T[];
    
    export let filter : (n:T, pattern:string)=> boolean;

	export let nodeId:(n:T) => any;

	export let selectable : boolean = false;

	export let emptyTreeMessage : string;
    
    let search : string;
    
    let currentRoot;

		let selection = {}

	let selectNode = (selectedNode, selected) => {
			selection[nodeId(selectedNode)] = selected;		
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