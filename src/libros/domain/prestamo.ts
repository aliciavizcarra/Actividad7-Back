import Usuario from "../../usuarios/domain/usuario";
import Ejemplar from "./ejemplar";

export default interface Prestamo{
    usuario: Usuario,
    ejemplar: Ejemplar,
    fechaprestamo: Date,
    fechadevolucion: Date
}