import Prestamo from "./prestamo";


export default interface LibroRepository{

    getPaginas():Promise<number>;

    getLibrosDisponibles(numPagina: number): Promise <any[]>;
    getNumPaginas(fragmentoBuscado: string): Promise<number>;
    getLibrosFromPagina(fragmentoBuscado:string, numPagina:number): Promise<any[]>; 
    prestarLibro(ejemplar: number, usuario:string): Promise<Prestamo>;
    mostrarPrestados(idUsuario: number): Promise <Prestamo[]>
    devolverLibro(ejemplar: number, usuario:string): Promise<Prestamo>;

}