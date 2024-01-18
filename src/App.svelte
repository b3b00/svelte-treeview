<script lang="ts">

	import TreeView from './TreeView.svelte';
	import Node from './Node.svelte';
		import {selectedNode} from './teststore.js'
	import {treeData, Disney} from './data.js';
  import { ComponentEvents } from 'svelte';
	

	class CustomEvent<T> {
		detail:T;
		type:string;
	}

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

	let selectedNodes : Disney[] = [];

	const onSelectionChanged = (e:CustomEvent<Disney[]>) => {		
		console.log(e);
		selectedNodes = e.detail;
	}
	
</script>

<h2>selectable and clickable tree view</h2>
{#if $selectedNode}
<b>#{$selectedNode.id} {$selectedNode.name}</b>	
{/if}

<div style="display:flex;flex-direction:row">
	<div>
	<TreeView emptyTreeMessage="no super hero to show" on:selectionChanged={onSelectionChanged} selectable {root} {childrenAccessor} nodeTemplate={Node} {filter} {nodeId}></TreeView>
	</div>
	<div>
		{#if selectedNodes && selectedNodes.length > 0}
			<ul>
				{#each selectedNodes as node}
					<li>{node.id} - {node.name}</li>
				{/each}
			</ul>
		{:else}
			<i>no selected node</i>
		{/if}
	</div>
</div>

<h2>not selectable, nor clickable</h2>


<TreeView emptyTreeMessage="Mikey Mouse" {root} {childrenAccessor} nodeTemplate={Node} {filter} {nodeId}></TreeView>




<h2>not selectable, nor clickable but stylish</h2>



	<style>


:global(.tv-node[ref="withStyle"]::before) {
  margin-left: 1ch;
  display: inline-block;
  content: '▶️';
  transition: 0.2s;
}
:global(details[ref="withStyle"][open] > .tv-node::before) {  
  content: '🔽';
  transition: 0.2s;
}
:global(.tv-leaf[ref="withStyle"]::before) {
		content: '🍃'
	}
  
  
</style>


<TreeView emptyTreeMessage="Mikey Mouse" ref="withStyle" {root} {childrenAccessor} nodeTemplate={Node} {filter} {nodeId}></TreeView>
