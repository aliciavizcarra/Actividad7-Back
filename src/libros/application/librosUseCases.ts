import LibroRepository from "../domain/libroRepository";
import Prestamo from "../domain/prestamo";

export default class LibroUseCases{

    constructor(private libroRepository: LibroRepository){};

    getPaginas():Promise<number>{
        return this.libroRepository.getPaginas();
    }
    getLibrosDisponibles(numPagina: number): Promise <any[]>{
        return this.libroRepository.getLibrosDisponibles(numPagina);
    }
   
    getNumPaginas(fragmentoBuscado: string): Promise<number>{
        return this.libroRepository.getNumPaginas(fragmentoBuscado);
    }

    getLibrosFromPagina(fragmentoBuscado:string, numPagina:number): Promise<any[]>{
        return this.libroRepository.getLibrosFromPagina(fragmentoBuscado,numPagina)
    } 

    prestarLibro(ejemplar: number, usuario:string, fecha: Date): Promise<Prestamo>{
        return this.libroRepository.prestarLibro(ejemplar,usuario,fecha)
    }

    mostrarPrestados(idUsuario: number): Promise <Prestamo[]>{
        return this.libroRepository.mostrarPrestados(idUsuario)
    }

    devolverLibro(ejemplar: number, usuario:string, fecha: Date): Promise<Prestamo>{
        return this.libroRepository.devolverLibro(ejemplar,usuario,fecha);
    }


}