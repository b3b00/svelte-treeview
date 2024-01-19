<script lang="ts">
   

    import { onMount,createEventDispatcher } from 'svelte';

  import { CharacterKind, Universe, CharacterFilter  } from './data';

	
    onMount(() => {
        name="";
        kind = CharacterKind.All;
        universe = Universe.All;
    })

	const dispatch = createEventDispatcher<{ "filterChanged": CharacterFilter }>();

    let name : string;

    let kind : CharacterKind;

    let universe : Universe;

    function change(){     
        dispatch('filterChanged',{name,kind,universe});	
    }

    function reset() {
        name = "";
        kind = CharacterKind.All;
        universe = Universe.All;
    }

    $:{
        dispatch('filterChanged',{name,kind,universe});
    }
    

</script>

<div style="display:flex;flex-direction:row">
    <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" bind:value={name} on:change={change}/>
    </div>
    <div>
        <label for="type">Type : </label>
        <select id="type" bind:value={kind} on:change={change}>
            <option value={CharacterKind.All} selected>{CharacterKind.All} </option>
            <option value={CharacterKind.Hero}>{CharacterKind.Hero}</option>
            <option value={CharacterKind.Villain}>{CharacterKind.Villain}</option>            
        </select>     
    </div>
    <div>
        <label for="universe">Univers :</label>  
        <select id="universe" bind:value={universe} on:change={change}>
            <option value={Universe.All} selected>{Universe.All} </option>
            <option value={Universe.StarWars} >{Universe.StarWars} </option>
            <option value={Universe.Marvel} >{Universe.Marvel} </option>
        </select> 
    </div>
    <div><button on:click={reset}>Reset</button></div>
</div>