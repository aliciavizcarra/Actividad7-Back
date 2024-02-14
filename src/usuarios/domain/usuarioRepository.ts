import Usuario from "./usuario";

export default interface UsuarioRepository{
    registro(usuario:Usuario): Promise<Usuario>;
    login(usuario:Usuario): Promise<Usuario>;
    actualizar(usuarioNuevo: Usuario, emailUsuario: string): Promise<Usuario>;
}