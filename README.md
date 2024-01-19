

## demo

[svelte-treeview](https://sveltetreeview.pages.dev/)


## installation

`npm i @bolduh/svelte-treeview`

## usage

```js
<TreeView emptyTreeMessage="nothing to show" selectable root={root} childrenAccessor={accessor} nodeTemplate={Node} filter={nodefilter} ></TreeView>
```

The treeview display a tree data structure that must inherit from TVNode
```ts
export interface TVNode {
    children : TVNode[]; // list of children (may be undefined if no children)
    id:any; // unique identifier
}
```

We will assume that `NodeType` is the node type of our treeview for now on.

### TreeView attributes:

- root (`NodeType`): the full tree datastructure
- emptyTreeMessage (`string`) : message to display when filter do not return any node
- selectable (`boolean`, default is false) : if set add checkbox in front of every node/leaf
- nodeTemplate : a svelte component used to render nodes and leafs. it must accept an attribute `data` of the node type (`NodeType`)
- filter (`(node:NodeType, filter:string ) => boolean `): a function used to filter nodes on a simple text input. if not set no search widget is displayed. returns true if the `node` matches the `filter`.  
- for custom filters. The TreeView can accept custom filters. A filter must be mapped to a typescript interface, there is no constraint on the type. for now on this class will be `customFilter` 
  - complexFilter(`(node:NodeType, filter:CustomFilter) => boolean`). A function that returns true if the `node` matches the `filter`
  - filterTemplate : a svelte component displaying the custom filter. It must throw a `filterChanged` event whenever the filter change. the event payload must be an object of type `CustomFilter`


### TreeView events: 

The TreeView could raise a `selectionChanged` event whenever a node is selected / deselected (when node selection is enabled with `selectable` attribute). The event payload contains a list of `NodeType` : `NodeType[]`

## styling a TreeView

```html

Use the following CSS template in your svelte app to customize tree icons (using emojis). 


<style>

// hide the default triangle   
:global(summary[ref="withStyle"]) {
  display: block;
}

// set ➕ as the closed node icon
:global(.tv-node[ref="withStyle"]::before) {
  margin-left: 1ch;
  display: inline-block;
  content: '➕';
  transition: 0.2s;
}

// set ➖ as the opened node icon
:global(details[ref="withStyle"][open] > .tv-node::before) {  
  content: '➖';
  transition: 0.2s;
}

// set 🦸🏻‍♂️ as the leaf icon
:global(.tv-leaf[ref="withStyle"]::before) {
		content: '🦸🏻‍♂️'
	}
</style>

<TreeView 
  emptyTreeMessage="Mikey Mouse" 
  ref="withStyle" 
  {root} {childrenAccessor} 
  nodeTemplate={Node} 
  {filter}></TreeView>
```