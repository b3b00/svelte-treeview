

**installation**

`npm i @bolduh/svelte-treeview`

**usage**

```js
<TreeView emptyTreeMessage="nothing to show" selectable root={root} childrenAccessor={accessor} nodeTemplate={Node} filter={nodefilter} {nodeId}></TreeView>
```

TreeView attributes : 
- emptyTreeMessage : message to display when filter do not return any node
- selectable (switch) : if set add checkbox in front of every node/leaf
- root : the tree datastructure
- childrenAccessor : a function that given a node returns the list of children nodes. node -> node[]
- nodeTemplate : a svelte component used to render nodes and leafs
- filter : a function used to filter nodes : string -> node
- nodeId : a function that given a node returns its id : node -> any
