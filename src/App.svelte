<script lang="ts">

	import TreeView from './TreeView.svelte';
	import Filter from './Filter.svelte';
	import Node from './Node.svelte';
		import {selectedNode} from './teststore.js'
	import {treeData, Disney, CharacterFilter, CharacterKind, Universe} from './data.js';
	import {TVNode, CustomEvent} from './TreeViewTypes';
	



	

	let name = 'world';
	$selectedNode = undefined

	let root = treeData;
	
	
	let filter = (node:Disney, search:string) :boolean => {
		const contains = node.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
		return contains;
	};

	let selectedNodes : Disney[] = [];

	const onSelectionChanged = (e:CustomEvent<Disney[]>) => {				
		selectedNodes = e.detail;
	}

	const characterFilter = (node:Disney, pattern:CharacterFilter) : boolean => {

		if (pattern.kind !== undefined) {
			if (node.kind != pattern.kind && pattern.kind != CharacterKind.All) {
				return false;
			}
		}
		if (pattern.universe !== undefined) {
			if (node.universe != pattern.universe && pattern.universe != Universe.All)	{
				return false;
			}			
		}
		if (pattern.name !== undefined && pattern.name !== null && pattern.name.length > 0) {
			return node.name.toLocaleLowerCase().includes(pattern.name);
		}
		return true;
	}
	
</script>

<h2>simple filter</h2>


<TreeView emptyTreeMessage="Mickey Mouse" {root}  nodeTemplate={Node} {filter} ></TreeView>

<h2>Select nodes</h2>
{#if $selectedNode}
<b>#{$selectedNode.id} {$selectedNode.name}</b>	
{/if}

<div style="display:flex;flex-direction:row">
	<div>
	<TreeView emptyTreeMessage="no super hero to show" on:selectionChanged={onSelectionChanged} selectable {root} nodeTemplate={Node} {filter} ></TreeView>
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






<h2>Custom filter</h2>



<TreeView emptyTreeMessage="Mikey Mouse"  {root} nodeTemplate={Node} searchTemplate={Filter} complexFilter={characterFilter}></TreeView>


<h2>Styling</h2>



	<style>


:global(summary[ref="withStyle"]) {
  display: block;
}

:global(.tv-node[ref="withStyle"]::before) {
  margin-left: 1ch;
  display: inline-block;
  content: '➕';
  transition: 0.2s;
}
:global(details[ref="withStyle"][open] > .tv-node::before) {  
  content: '➖';
  transition: 0.2s;
}
:global(.tv-leaf[ref="withStyle"]::before) {
		content: '🦸🏻‍♂️'
	}
  
  
</style>


<TreeView emptyTreeMessage="Mikey Mouse" ref="withStyle" {root} nodeTemplate={Node} {filter} ></TreeView>