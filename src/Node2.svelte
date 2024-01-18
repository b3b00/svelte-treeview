

<script lang="ts">
	
    export let data;
	
		

</script>
{#if data}
<span style='cursor:pointer' >#{data.id} {data.name} ({data.children ? data.children.length : 0})</span>
{/if}