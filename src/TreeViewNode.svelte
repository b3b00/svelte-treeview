<style>
    .treemargin {
        margin-left: 25px;
    }
	
</style>
<script lang="ts" generics="T">

    import {onMount} from "svelte";
	import {getContext} from 'svelte';
  import TreeView from "./TreeView.svelte";

    export let node;

	export let ref;
    
    export let nodeTemplate;
    
    export let childAccessor:(n:T) => T[];

		export let nodeId;

		export let selectable;

		export let selected = false;
	
    let child;
    let isNode;
	
	let selectNode = getContext<(n:any, selected:boolean) => void>('selectNode');
	let isNodeSelected = getContext<(n:any) => boolean>('isNodeSelected');
    
    onMount(async () => {        		
        child = childAccessor(node);        
        isNode = child && Array.isArray(child) && child.length > 0;    
	});  
	
	
	const getAllChildren = (n:T): T[] => {
		let children = childAccessor(n);
		let isnode = children && Array.isArray(children) && children.length > 0; 
		if (isnode) {				
			const subs = children.map(getAllChildren).reduce(function(a, b){ return a.concat(b); }, [n]);
			return subs;
		}
		else {
			return [n];
		}
	}
	
	const handleSelect = () => {						
		selectNode(node,selected);			
		if (isNode) {
			handleSelectNode();
		}
		node = node;
	}

	const handleSelectNode = () => {
		const all = getAllChildren(node);
		for(let i = 0; i < all.length; i++) {
			selectNode(all[i],selected);
		}
	}

</script>

{#if isNode}
    <details ref={ref} open class="treemargin" style="text-align: left">
        <summary class="tv-node" ref={ref}>					
					{#if selectable}
							<input type="checkbox" bind:checked={selected} on:change={handleSelect}/>
					{/if}
            <svelte:component this={nodeTemplate} data={node}/>
        </summary>

        {#each childAccessor(node) as subNode}
            <svelte:self {ref} selected={isNodeSelected(subNode)} {selectable} {nodeId} node={subNode} {nodeTemplate} childAccessor={childAccessor}/>
        {/each}

    </details>
{:else}
    <div class="treemargin tv-leaf" ref={ref}>
			{#if selectable}
							<input type="checkbox" bind:checked={selected} on:change={handleSelect}/>
					{/if}
        <svelte:component this={nodeTemplate} data={node}/>
    </div>
{/if}


