
import { TVNode } from "./TreeViewTypes";


export enum CharacterKind {
  Hero = "Hero",
  Villain = "Villain",
  All = "All"
}

export enum Universe {
  StarWars = "StarWars",
  Marvel = "Marvel",
  All="All"
}

export class Disney implements TVNode {
  id: number;
  name: string;
  children: Disney[];
  kind: CharacterKind | undefined = undefined;  
  universe: Universe;
}



export interface CharacterFilter {
  name: string;
  kind: CharacterKind;
  universe: Universe;
}

export const treeData: Disney = {
  id: 0,
  name: "Disney",
  universe: Universe.All,
  kind: CharacterKind.All,
  children: [
    {
      id: 1,
      name: "star wars",
      universe: Universe.StarWars,
      kind:CharacterKind.All,
      children: [
        {
          id: 2,
          name: "Obiwan Kenobi",
          children: [],
          kind: CharacterKind.Hero,
          universe: Universe.StarWars
        },
        {
          id: 22,
          name: "Luke Skywalker",
          children: [],
          kind: CharacterKind.Hero,
          universe: Universe.StarWars
        },
        {
          id: 3,
          name: "Dark Vador",
          children: [],
          kind: CharacterKind.Villain,
          universe: Universe.StarWars
        },
        {
          id: 666,
          name: "Palpatine",
          children: [],
          kind: CharacterKind.Villain,
          universe: Universe.StarWars
        },
      ],
    },
    {
      id: 4,
      name: "Marvel",
      universe: Universe.Marvel,  
      kind: CharacterKind.All,    
      children: [
        {
          id: 5,
          name: "Hulk",
          children: [],
          kind: CharacterKind.Hero,
          universe: Universe.Marvel
        },
        {
          id: 6,
          name: "Spiderman",
          children: [],
          kind: CharacterKind.Hero,
          universe: Universe.Marvel
        },
        {
          id: 7,
          name: "Venom",
          children: [],
          kind: CharacterKind.Villain,
          universe: Universe.Marvel
        },
        {
          id: 777,
          name: "Thanos",
          children: [],
          kind: CharacterKind.Villain,
          universe: Universe.Marvel
        },
      ],
    },
  ],
};
