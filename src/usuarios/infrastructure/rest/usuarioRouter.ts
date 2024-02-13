import express from "express";
import UsuarioUseCases from "../../application/usuarioUseCases";
import UsuarioReositoryPostgress from "../db/usuarioPostgres";
import Usuario from "../../domain/usuario";
import { createToken } from "../../../context/security/auth";

const usuarioUseCases: UsuarioUseCases = new UsuarioUseCases(new UsuarioReositoryPostgress);

const router = express.Router();

router.post("/registro", async (req,res)=>{

    const usuarioIntroducido = req.body;
    const usuarioNuevo: Usuario = {
        nombre:usuarioIntroducido.nombre,
        password: usuarioIntroducido.password,
        email: usuarioIntroducido.email,
        apellidos: usuarioIntroducido.apellidos
    }

    const usuario: Usuario = await usuarioUseCases.registro(usuarioNuevo);
    res.json(usuario.email);
})

router.post("/login", async (req,res)=>{

    const usuarioAPI = req.body;

    const usuario: Usuario = await usuarioUseCases.login(usuarioAPI);
    if(usuario === null)
        res.status(404).json({mensaje : "Usuario no encontrado"});
    const token = createToken(usuario);
    res.json({usuario, token});
})


export {router as routerUsuarios};