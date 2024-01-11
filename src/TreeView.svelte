<script>

    import {onMount} from "svelte";
		import {setContext} from 'svelte';
	    import TreeViewNode from "./TreeViewNode.svelte";

    export let root = {};
    
    export let nodeTemplate;

    export let childrenAccessor;
    
    export let filter = null;

		export let nodeId;

		export let selectable;
    
    let search;
    
    let currentRoot;

		let selection = {}

	let selectNode = (selectedNode, selected) => {
			selection[nodeId(selectedNode)] = selected;		
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
            currentRoot = filter(root, search);					
        }        
    }

    onMount(async () => {
        currentRoot = root;
    })

</script>


<input type="text" bind:value={search}/>
<TreeViewNode  {nodeId} {selectable} node={currentRoot} nodeTemplate={nodeTemplate} childAccessor={childrenAccessor}/>