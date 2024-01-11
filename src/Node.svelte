

<script>
	import {selectedNode} from './teststore.js'
    export let data;
	
	function clickNode(e) {	
		e.preventDefault(); // avoid deploy/collapse node when clicking node name
		$selectedNode = data;		
		console.log(data);
	}


		

</script>

<span style='cursor:pointer' role="link" tabindex={data.id} on:click={clickNode} on:keydown={clickNode}>id:&gt;{data.id}&lt; - name:&gt;{data.name}&lt;</span>