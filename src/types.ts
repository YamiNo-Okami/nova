export type Grid = {
    id: string;
    name: string;
    active: boolean;
    cards : CardData[];
}

export type CardData = {
    id: string;
    x: number;
    y: number;
    title:string;
    width: number;
    height: number;
    content: string;
} 



export const gridsData: Grid[] = [
  {
    id: "grid-1",
    active: true,
    name: "Ideas & Brainstorm",
    cards: [
      {
        id: "card-1",
        x: 120,
        y: 80,
        title: "Project Vision",
        width: 360,
        height: 220,
        content: `# Vision
Build a visual workspace app
- Infinite canvas
- Markdown cards
- Fast interactions`
      },
      {
        id: "card-2",
        x: 540,
        y: 100,
        title: "Feature List",
        width: 320,
        height: 260,
        content: `## Core Features
- Draggable cards
- Resizable cards
- Markdown editor
- Multiple grids`
      },
      {
        id: "card-3",
        x: 300,
        y: 380,
        title: "Inspiration",
        width: 280,
        height: 180,
        content: `Apps to look at:
- Notion
- Milanote
- Obsidian`
      }
    ]
  },

  {
    id: "grid-2",
    active: false,
    name: "Development Notes",
    cards: [
      {
        id: "card-4",
        x: 150,
        y: 120,
        title: "Canvas Logic",
        width: 400,
        height: 240,
        content: `### Canvas
- Pan with mouse drag
- Zoom with scroll
- Clamp boundaries`
      },
      {
        id: "card-5",
        x: 620,
        y: 140,
        title: "Card State",
        width: 360,
        height: 260,
        content: `\`\`\`ts
type CardData = {
  x: number;
  y: number;
  width: number;
  height: number;
}
\`\`\`
State lifted to parent`
      },
      {
        id: "card-6",
        x: 420,
        y: 460,
        title: "Bugs / Issues",
        width: 300,
        height: 200,
        content: `- Card resize affects others
- Cursor direction issue
- Textarea height mismatch`
      }
    ]
  },

  {
    id: "grid-3",
    active: false,
    name: "Personal Notes",
    cards: [
      {
        id: "card-7",
        x: 100,
        y: 90,
        title: "Learning Goals",
        width: 340,
        height: 220,
        content: `This month:
- React internals
- Canvas math
- State management`
      },
      {
        id: "card-8",
        x: 500,
        y: 200,
        title: "Random Thoughts",
        width: 260,
        height: 180,
        content: `Ideas are cheap.
Execution is everything.`
      }
    ]
  }
];
