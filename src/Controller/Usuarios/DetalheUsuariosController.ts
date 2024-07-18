import { Request,Response,NextFunction } from "express";
import { DetalheUsuarioServico } from "../../Services/Usuarios/DetalheUsuariosServico";


class DetalheUsuarioController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id

        const detalheUsuarioServico = new DetalheUsuarioServico()

        const usuario = await detalheUsuarioServico.execute(user_id)

        return res.json(usuario)
    }
}

export { DetalheUsuarioController };