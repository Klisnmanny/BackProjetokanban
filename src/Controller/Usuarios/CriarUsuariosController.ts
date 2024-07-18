import { Request,Response } from "express";
import { CriarUsuarioServico } from "../../Services/Usuarios/CriarUsuariosServico";

class CriarUsuarioController{
    async handle(req:Request, res: Response){

        const {nome,senha} = req.body

        const criarUsuarioServico = new CriarUsuarioServico()

        const usuario = await criarUsuarioServico.execute({
            nome,
            senha
        })

        return res.json(usuario)
    }
}


export {CriarUsuarioController}