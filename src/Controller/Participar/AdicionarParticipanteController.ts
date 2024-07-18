import { Request, Response } from "express";
import { AdicionarParticipanteServico } from "../../Services/Participar/AdicionarParticipanteServico";

class AdicionarParticipanteController {
    async handle(req: Request, res: Response) {
        const { projetoId, usuarioId } = req.body;

        if (!projetoId || !usuarioId) {
            return res.status(400).json({ message: 'ID do projeto e ID do usuário são obrigatórios' });
        }

        try {
            const adicionarParticipanteServico = new AdicionarParticipanteServico();
            const participacao = await adicionarParticipanteServico.execute(projetoId, usuarioId);
            return res.status(201).json(participacao);
        } catch (error) {
            
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Não foi possível adicionar o participante' });
        }
    }
}

export { AdicionarParticipanteController };
