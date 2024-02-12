import Ejemplar from "../../libros/domain/ejemplar";
import Prestamo from "../../prestamos/domain/prestamo";
import Usuario from "./usuario";

export default interface UsuarioRepository{
    registro(usuario:Usuario): Promise<Usuario>;
    login(usuario:Usuario): Promise<Usuario>;
}