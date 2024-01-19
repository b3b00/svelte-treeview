
import { TVNode } from "./TreeViewTypes";

export class Disney implements TVNode {
  id: number;
  name: string;
  children: Disney[];
  vilain?: boolean | undefined = undefined;
}

export interface VillainFilter {
  name: string;
  villain: boolean;
}

export const treeData: Disney = {
  id: 0,
  name: "Disney",
  children: [
    {
      id: 1,
      name: "star wars",
      children: [
        {
          id: 2,
          name: "obiwan kenobi",
          children: [],
          vilain: false,
        },
        {
          id: 3,
          name: "dark vador",
          children: [],
          vilain: true,
        },
        {
          id: 666,
          name: "palpatine",
          children: [],
          vilain: true,
        },
      ],
    },
    {
      id: 4,
      name: "marvel",
      children: [
        {
          id: 5,
          name: "hulk",
          children: [],
          vilain: false,
        },
        {
          id: 6,
          name: "spiderman",
          children: [],
          vilain: false,
        },
        {
          id: 7,
          name: "venom",
          children: [],
          vilain: true,
        },
        {
          id: 777,
          name: "Thanos",
          children: [],
          vilain: true,
        },
      ],
    },
  ],
};
