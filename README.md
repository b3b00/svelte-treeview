

**installation**

`npm i @bolduh/svelte-treeview`

**usage**

```js
<TreeView emptyTreeMessage="nothing to show" selectable root={root} childrenAccessor={accessor} nodeTemplate={Node} filter={nodefilter} {nodeId}></TreeView>
```

TreeView attributes (give  that NodeType is the no de type) : 
- emptyTreeMessage (string) : message to display when filter do not return any node
- selectable (boolean) : if set add checkbox in front of every node/leaf
- root (NodeType): the tree datastructure
- childrenAccessor ( NodeType => NodeType[] ) : a function that given a node returns the list of children nodes. 
- nodeTemplate : a svelte component used to render nodes and leafs
- filter ( ( NodeType, string ) => booléen ): a function used to filter nodes. if not set no search widget IS displayed 
- nodeId ( NodeType => any ): a function that given a node returns its id : node -> any
