import executeQuery from "../../../context/pgConnection";
import Ejemplar from "../../domain/ejemplar";
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

    async prestarLibro(ejemplar: number, usuario:string): Promise<Prestamo> {
        

        const consulta = `INSERT INTO prestamos(
            usuario, ejemplar, fechaprestamo)
            VALUES ('${usuario}', ${ejemplar}, now()) RETURNING *;`;

        
        const prestamoDB: any[] = await executeQuery(consulta);

        console.log(prestamoDB);
        
            const prestamo: Prestamo = {
                ejemplar: prestamoDB[0].ejemplar,
                usuario: prestamoDB[0].usuario,
                fechaprestamo: prestamoDB[0].fechaprestamo,
                fechadevolucion: prestamoDB[0].fechadevolucion
            }
    
        return prestamo;

    }


    async mostrarPrestados(idUsuario: number): Promise<Prestamo[]> {
        
        const prestamos : Prestamo[] = []

        const consulta = `SELECT
        prestamos.ejemplar as ejemplar_id,
        libros.id as libro_id,
        libros.titulo,
        libros.autor,
        prestamos.fechaprestamo,
        prestamos.fechadevolucion
        from prestamos
        join ejemplares
        on prestamos.ejemplar = ejemplares.id
        join libros
        on libros.id =ejemplares.libro
        WHERE
        prestamos.usuario = '${idUsuario}'`

        const prestamoDB: any[] = await executeQuery(consulta);

        for(const item of prestamoDB){

            const libroPrestado: Libro = {
                id: item.libro_id,
                titulo: item.titulo,
                autor: item.autor,
            }

            const ejemplar:Ejemplar = {
                id: item.ejemplar_id,
                libro:libroPrestado
            }

            const prestamo: Prestamo = {
                ejemplar: ejemplar,
                fechaprestamo: item.fechaprestamo,
                fechadevolucion: item.fechadevolucion
            }

            prestamos.push(prestamo);
        }

        return prestamos
    }


    async devolverLibro(ejemplar: number, usuario:string): Promise<Prestamo> {


        const consulta = `UPDATE prestamos
        SET fechadevolucion=now()
        WHERE ejemplar=${ejemplar} and usuario='${usuario}' RETURNING *;`;

        const prestamoDB: any[] = await executeQuery(consulta);

            const prestamo: Prestamo = {
                ejemplar: prestamoDB[0].ejemplar,
                usuario: prestamoDB[0].usuario,
                fechaprestamo: prestamoDB[0].fechaprestamo,
                fechadevolucion: prestamoDB[0].fechadevolucion
            }
    
        return prestamo;

    }


}