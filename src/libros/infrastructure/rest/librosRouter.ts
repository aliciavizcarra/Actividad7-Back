import express from "express";
import LibroUseCases from "../../application/librosUseCases";
import LibroRepositoryPostgres from "../db/libroRepositoryPostgress";
import { createToken, isAuth } from "../../../context/security/auth";


const librosUseCases = new LibroUseCases(new LibroRepositoryPostgres);

const router = express.Router();

router.get("/paginas", async(req,res)=>{

    try{
        const numeroPaginas = await librosUseCases.getPaginas();
        console.log(numeroPaginas)
        res.json(numeroPaginas);
    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }  
})

router.get("/:numPagina", async(req,res)=>{
    
    try{

        const numPagina = parseInt(req.params.numPagina)
        const librosDisponibles = await librosUseCases.getLibrosDisponibles(numPagina);
        res.json(librosDisponibles);

    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }  
})

router.get("/:fragmentoBuscado/paginas", async(req,res)=>{

    try{
        const fragmentoBuscado = req.params.fragmentoBuscado
        const numeroPaginas = await librosUseCases.getNumPaginas(fragmentoBuscado);
        res.json(numeroPaginas);

    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }  
})

router.get("/:fragmentoBuscado/:numPagina", async(req,res)=>{
    
    try{
        const numPagina = parseInt(req.params.numPagina)
        const fragmentoBuscado = req.params.fragmentoBuscado

        const librosDisponibles = await librosUseCases.getLibrosFromPagina(fragmentoBuscado,numPagina);
        res.json(librosDisponibles);

    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }  
})

router.post("/:ejemplar", isAuth, async(req,res)=>{
    
    try{
        const emailUsuario = req.body.userEmail;
        const idLibro = parseInt(req.params.ejemplar)
        const prestamo = await librosUseCases.prestarLibro(idLibro,emailUsuario)
        res.json(prestamo)
    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }  
})


router.get("/", isAuth, async(req,res)=>{

    try{
        const emailUsuario = req.body.userEmail;
        const libros = await librosUseCases.mostrarPrestados(emailUsuario)
        res.json(libros)
    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }  
})

router.put("/:ejemplar", isAuth, async(req,res)=>{

    try{
        const emailUsuario = req.body.userEmail;
        const idLibro = parseInt(req.params.ejemplar)
        const prestamo = await librosUseCases.devolverLibro(idLibro,emailUsuario)
        console.log(prestamo)
        res.json(prestamo)

    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }  

})


export {router as routerLibros}