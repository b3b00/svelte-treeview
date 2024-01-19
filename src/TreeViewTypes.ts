	
    
    export class CustomEvent<T> extends Event{
		detail:T;
		type:string;
	}

    export interface TVNode {
		children : TVNode[];
		id:any;
	}