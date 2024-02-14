import Libro from "./libro";

export default interface Ejemplar{
    id?:number,
    libro: Libro,
    disponible:boolean
}