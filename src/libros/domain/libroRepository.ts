import Prestamo from "./prestamo";


export default interface LibroRepository{

    getPaginas():Promise<number>;

    getLibrosDisponibles(numPagina: number): Promise <any[]>;
    //contarDisponibles?? -> metodo para añadir el atributo "disponibles": 4 en el metodo anterior
    getNumPaginas(fragmentoBuscado: string): Promise<number>;
    getLibrosFromPagina(fragmentoBuscado:string, numPagina:number): Promise<any[]>; //igual que el getLibrosDisponibles pero especificando la pagina
    prestarLibro(ejemplar: number, usuario:string, fecha: Date): Promise<Prestamo>;
    mostrarPrestados(idUsuario: number): Promise <Prestamo[]>
    devolverLibro(ejemplar:number): Prestamo;

}