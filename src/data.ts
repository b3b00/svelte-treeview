export interface Disney {
	id:number,
	name:string,
	children:Disney[]
}

export const treeData:Disney = {
		id : 0,
		name : 'Disney',
		children : [
			{
		id : 1,
		name : 'star wars',
		children : [
			{
		id : 2,
		name : 'obiwan kenobi',
		children : [
			
		]
	},
			{
		id : 3,
		name : 'dark vador',
		children : [
			
		]
	}
		]
	},
			{
		id : 4,
		name : 'marvel',
		children : [
			{
		id : 5,
		name : 'hulk',
		children : [
			
		]
	},
			{
		id : 6,
		name : 'spiderman',
		children : [
			
		]
	}
		]
	}
		]
	}