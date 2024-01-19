<script lang="ts">
   

import { createEventDispatcher } from 'svelte';
  import { VillainFilter  } from './data';

	
	const dispatch = createEventDispatcher<{ "filterChanged": VillainFilter }>();

    export let search: VillainFilter = {
        name:"",
        villain:undefined
    }

    function change(){
        dispatch('filterChanged',search);	
    }

    $:{
        dispatch('filterChanged',search);	
    }
    

</script>

<div style="display:flex;flex-direction:row">
    <div>
        <label for="name">Nom</label>
        <input type="text" id="name" bind:value={search.name} on:change={change}/>
    </div>
    <div>
        <label for="villain">villain</label>
        <input type="checkbox" id="villain" bind:checked={search.villain} on:change={change}/>
    </div>
</div>