import Prestamo from "./prestamo";


export default interface LibroRepository{

    getPaginas():number;
    getLibrosDisponibles(numPagina: number): Promise <any[]>;
    //contarDisponibles?? -> metodo para añadir el atributo "disponibles": 4 en el metodo anterior
    getNumPaginas(fragmentoBuscado: string): number;
    getLibrosFromPagina(fragmentoBuscado:string, numPagina:number): Promise<any[]>; //igual que el getLibrosDisponibles pero especificando la pagina
    prestarLibro(ejemplar:number): Prestamo;
    mostrarPrestados(idUsuario: number): Promise <Prestamo[]>
    devolverLibro(ejemplar:number): Prestamo;

}