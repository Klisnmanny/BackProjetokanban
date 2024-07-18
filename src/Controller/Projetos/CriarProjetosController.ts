import { Request,Response } from "express";
import { CriarProjetoServico } from "../../Services/Projetos/CriarProjetosServico";

class CriarProjetosController{
    async handle(req:Request, res: Response){

        const {titulo,descricao,usuarioId} = req.body

        const criarProjetosServico = new CriarProjetoServico()

        const projetos = await criarProjetosServico.execute({
            titulo,
            descricao,
            usuarioId
        })

        return res.json(projetos)
    }
}

export {CriarProjetosController}