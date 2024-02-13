import executeQuery from "../../../context/pgConnection";
import Usuario from "../../domain/usuario";
import UsuarioRepository from "../../domain/usuarioRepository";

export default class UsuarioReositoryPostgress implements UsuarioRepository{
    
    async actualizar(usuarioNuevo: Usuario, emailUsuario: string): Promise<Usuario> {
        
        const consulta = `UPDATE usuarios
        SET email='${usuarioNuevo.email}', nombre='${usuarioNuevo.nombre}', apellidos='${usuarioNuevo.apellidos}', password='${usuarioNuevo.password}'
        WHERE email='${emailUsuario}' returning *;`

        const rows: any[] = await executeQuery(consulta);

        const usuarioBD: Usuario = {
            nombre: rows[0].nombre,
            password: rows[0].password,
            email: rows[0].email,
            apellidos: rows[0].apellidos
        }

        return usuarioBD;
    }

    async registro(usuario: Usuario): Promise<Usuario> {
        
        const consulta = `INSERT INTO usuarios(
        email, password, nombre, apellidos)
        VALUES ('${usuario.email}', '${usuario.password}', '${usuario.nombre}', '${usuario.apellidos}') returning *`;
        const rows: any[] = await executeQuery(consulta);

        const usuarioBD: Usuario = {
            nombre: rows[0].nombre,
            password: rows[0].password,
            email: rows[0].email,
            apellidos: rows[0].apellidos
        }

        return usuarioBD;

    }


    async login(usuario: Usuario): Promise<Usuario> {

        const consulta = `select * from usuarios where email = '${usuario.email}'`;
        const rows: any[] = await executeQuery(consulta);
        if(rows.length === 0){
            throw new Error("Usuario/contraseña no es correcto");
        }else{
            const usuarioBD: Usuario = {
                email: rows[0].email,
                password:rows[0].password,
                nombre: rows[0].nombre,
                apellidos: rows[0].apellidos
            }
            return usuarioBD;
        }
        
    }

}