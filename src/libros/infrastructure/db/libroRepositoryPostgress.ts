import executeQuery from "../../../context/pgConnection";
import Libro from "../../domain/libro";
import LibroRepository from "../../domain/libroRepository";
import Prestamo from "../../domain/prestamo";


export default class LibroRepositoryPostgres implements LibroRepository{

    async getPaginas(): Promise<number> {

         const consulta = `select count(*)/10 as numpaginas from libros `

        const rows: any[] = await executeQuery(consulta)

        console.log(rows)

        const numeroPaginas = rows[0];

        return numeroPaginas;

    }

    async getLibrosDisponibles(numPagina: number): Promise<any[]> {

        const librosDisponibles : Libro[] = []

        const consulta = `select *, (select count(*) from ejemplares where disponible = 'true' and libro = libros.id) as disponibles
        from libros ORDER BY id limit 10 offset ${numPagina} *10 `

        const librosDB: any[] = await executeQuery(consulta);

        for(const item of librosDB){

            const libro: Libro = {
                id: item.id,
                titulo: item.titulo,
                autor: item.autor,
                disponibles: item.disponibles
            }
            librosDisponibles.push(libro);
        }

        return librosDisponibles;

    }

    async getNumPaginas(fragmentoBuscado: string): Promise<number> {

        const consulta = `select count(*)/10 as numPaginas
        from libros as numPaginas where titulo LIKE '%${fragmentoBuscado}%' `

        const rows: any[] = await executeQuery(consulta)

        console.log(rows)

        const numeroPaginas = rows[0];

        return numeroPaginas;

    }


    async getLibrosFromPagina(fragmentoBuscado: string, numPagina: number): Promise<any[]> {

        const librosDisponibles : Libro[] = []

        const consulta = `select *, (select count(*) from ejemplares where disponible = 'true' 
        and libro = libros.id ) as disponibles  
        from libros where titulo LIKE '%${fragmentoBuscado}%' ORDER BY id limit 10 offset ${numPagina} *10`

        const librosDB: any[] = await executeQuery(consulta);

        for(const item of librosDB){

            const libro: Libro = {
                id: item.id,
                titulo: item.titulo,
                autor: item.autor,
                disponibles: item.disponibles
            }
            librosDisponibles.push(libro);
        }

        return librosDisponibles;
    }

    async prestarLibro(ejemplar: number, usuario:string, fecha: Date): Promise<Prestamo> {
        
        const consulta = `INSERT INTO prestamos(
            usuario, ejemplar, fechaprestamo)
            VALUES ('${usuario}',${ejemplar},'${fecha}');`

        const prestamoDB: any[] = await executeQuery(consulta);

            const prestamo: Prestamo = {
                ejemplar: prestamoDB[0].ejemplar,
                usuario: prestamoDB[0].usuario,
                fechaprestamo: prestamoDB[0].fechaprestamo
            }
    
        return prestamo;

    }


    mostrarPrestados(idUsuario: number): Promise<Prestamo[]> {
        throw new Error("Method not implemented.");
    }
    devolverLibro(ejemplar: number): Prestamo {
        throw new Error("Method not implemented.");
    }


}