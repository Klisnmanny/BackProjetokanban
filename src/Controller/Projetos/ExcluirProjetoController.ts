import { Request,Response } from "express";
import { ExcluirProjetoService } from "../../Services/Projetos/ExcluirProjetoService";

class ExcluirProjetoController{
     async handle( req: Request, res: Response){
        const  id_projeto = req.query.id_projeto as string

        const apagarProjeto = new ExcluirProjetoService()

        const apagar = await apagarProjeto.execute({
            id_projeto
        })

        return res.json(apagar)
     }
}

export {ExcluirProjetoController}