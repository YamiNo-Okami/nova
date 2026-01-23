export type Grid = {
    id: string;
    name: string;
    cards : CardData[];
}

export type CardData = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    content: string;
} 

