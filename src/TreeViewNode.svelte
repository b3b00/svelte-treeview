<style>
    .treemargin {
        margin-left: 25px;
    }
	
</style>
<script>

    import {onMount} from "svelte";
	import {getContext} from 'svelte';


    export let node;
    
    export let nodeTemplate;
    
    export let childAccessor;

		export let nodeId;

		export let selectable;

		export let selected = false;
	
    let child;
    let isNode;
	
	let selectNode = getContext('selectNode');
	let isNodeSelected = getContext('isNodeSelected');
    
    onMount(async () => {        		
        child = childAccessor(node);        
        isNode = child && Array.isArray(child) && child.length > 0;    
	});  
	
	
	const getAllChildren = (n) => {
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
    <details open class="treemargin" style="text-align: left">
        <summary >					
					{#if selectable}
							<input type="checkbox" bind:checked={selected} on:change={handleSelect}/>
					{/if}
            <svelte:component this={nodeTemplate} data={node}/>
        </summary>

        {#each childAccessor(node) as subNode}
            <svelte:self selected={isNodeSelected(subNode)} {selectable} {nodeId} node={subNode} {nodeTemplate} childAccessor={childAccessor}/>
        {/each}

    </details>
{:else}
    <div class="treemargin leaf">
			{#if selectable}
							<input type="checkbox" bind:checked={selected} on:change={handleSelect}/>
					{/if}
        <svelte:component this={nodeTemplate} data={node}/>
    </div>
{/if}


