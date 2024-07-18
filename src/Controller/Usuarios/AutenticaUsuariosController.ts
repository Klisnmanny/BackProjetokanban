import { Request,Response } from "express";
import { AutenticaUsuarioServico } from "../../Services/Usuarios/AutenticaUsuarioServico";

class AutenticaUsuarioController{
    async handle(req: Request, res: Response){
        const{nome,senha} = req.body

        const autenticaUsuarioServico = new AutenticaUsuarioServico()
        const autentica = await autenticaUsuarioServico.execute({
            nome,
            senha
        })
        return res.json(autentica)
   }
   
}

export {AutenticaUsuarioController}