import { Request, Response } from "express";
import { ExcluirParticipacaoServico } from "../../Services/Participar/ExcluirParticipacaoServico"; 


class ExcluirParticipacaoController {
    async handle(req: Request, res: Response) {
        const { projetoId, usuarioId } = req.body;
        const solicitanteId = req.headers['usuario-id'] as string;

        if (!projetoId || !usuarioId || !solicitanteId) {
            
            return res.status(400).json({ message: 'ID do projeto, ID do usuário e ID do solicitante são obrigatórios' });
        }

        try {
            const excluirParticipacaoServico = new ExcluirParticipacaoServico();
            const result = await excluirParticipacaoServico.execute(projetoId, usuarioId, solicitanteId);
            
            return res.status(200).json(result);
        } catch (error) {
            
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Não foi possível remover a participação' });
        }
    }
}

export { ExcluirParticipacaoController };