<script>

	import TreeView from './TreeView.svelte';
	import Node from './Node.svelte';
		import {selectedNode} from './teststore.js'
	import {treeData} from './data.js';
	
	let name = 'world';
	$selectedNode = undefined

	let root = treeData;

	let accessor = (x) => {
		if (x && x.children != undefined && x.children != null && Array.isArray(x.children)) {
            return x.children;
        }
        return [];
	}
	
	let nodeId = (x) => x.id;
	
	let nodefilter = (node, search) => {
		if (search === undefined || search === null || search == '') {
			return node;
		}
		var children = accessor(node);
		if (children.length > 0) {
			var filtered = children.map(x => nodefilter(x, search)).filter(x => x!= null);
			if ( node.name.includes(search)) {
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
			if (node.name.includes(search)) {
				return node;
			}
			return null;
		}
	}  
</script>
{#if $selectedNode}
<h1>#{$selectedNode.id} {$selectedNode.name}</h1>	
{/if}
<TreeView emptyTreeMessage="no super hero to show" selectable root={root} childrenAccessor={accessor} nodeTemplate={Node} filter={nodefilter} {nodeId}></TreeView>
