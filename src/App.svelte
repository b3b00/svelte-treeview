<script>

	import TreeView from './TreeView.svelte';
	import Node from './Node.svelte';
		import {selectedNode} from './teststore.js'
	import {treeData} from './data.js';
	
	let name = 'world';
	$selectedNode = undefined

	let root = treeData;

	let childrenAccessor = (x) => {
		if (x && x.children != undefined && x.children != null && Array.isArray(x.children)) {
            return x.children;
        }
        return [];
	}
	
	let nodeId = (x) => x.id;
	
	let filter = (node, search) => node.name.includes(search);
	
</script>
{#if $selectedNode}
<h1>#{$selectedNode.id} {$selectedNode.name}</h1>	
{/if}
<TreeView emptyTreeMessage="no super hero to show" selectable {root} {childrenAccessor} nodeTemplate={Node} {filter} {nodeId}></TreeView>
