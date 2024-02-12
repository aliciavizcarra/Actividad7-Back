import Ejemplar from "../../libros/domain/ejemplar";
import Usuario from "../../usuarios/domain/usuario";

export default interface Prestamo{
    usuario: Usuario,
    ejemplar: Ejemplar,
    fechaprestamo: Date,
    fechadevolucion: Date
}