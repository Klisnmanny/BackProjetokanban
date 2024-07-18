import { Request, Response } from "express";
import { ListarProjetosServico } from "../../Services/Projetos/ListarProjetosServico";

class ListarProjetosController {
    async handle(req: Request, res: Response) {
        // Extrai o ID do usuário do parâmetro de consulta, corpo ou cabeçalho
        const usuarioId = req.query.usuarioId as string || req.body.usuarioId as string || req.headers['usuario-id'] as string;

        if (!usuarioId) {
            return res.status(400).json({ message: 'ID do usuário é obrigatório' });
        }

        try {
            const listarProjetosServico = new ListarProjetosServico();
            
            // Busca os projetos do usuário
            const projetos = await listarProjetosServico.execute(usuarioId);

            return res.json(projetos);
        } catch (error) {
            console.error(error); // Log do erro no console
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Não foi possível listar os projetos.', error: error.message });
            }
            return res.status(500).json({ message: 'Não foi possível listar os projetos.' });
        }
    }
}

export { ListarProjetosController };
