<script lang="ts">

	import TreeView from './TreeView.svelte';
	import Node from './Node.svelte';
		import {selectedNode} from './teststore.js'
	import {treeData, Disney} from './data.js';
	
	let name = 'world';
	$selectedNode = undefined

	let root = treeData;

	let childrenAccessor = (x:Disney) => {
		if (x && x.children != undefined && x.children != null && Array.isArray(x.children)) {
            return x.children;
        }
        return [];
	}
	
	let nodeId = (x:Disney) => x.id;
	
	let filter = (node:Disney, search:string) => node.name.includes(search);
	
</script>
{#if $selectedNode}
<h1>#{$selectedNode.id} {$selectedNode.name}</h1>	
{/if}
<TreeView emptyTreeMessage="no super hero to show" selectable {root} {childrenAccessor} nodeTemplate={Node} {filter} {nodeId}></TreeView>


<TreeView emptyTreeMessage="Mikey Mouse"  {root} {childrenAccessor} nodeTemplate={Node} {filter} {nodeId}></TreeView>
