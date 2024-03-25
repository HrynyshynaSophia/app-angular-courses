import { Author } from "./author.model";
export interface Course{
    id:number;
    isTopRated: boolean,
    name: string;
    description: string,
    date:string;
    authors:Array<Author>;
    length:number;
}
