import { Genre } from "./genre";

export interface Book {
    id: any;
    title: string;
    author: string;
    description: string;
    genre: Genre
}
