import { Request, Response } from "express";
import { CardServico } from "../../Services/Cards/CardServico";

class CardController {
    // Método para criar um novo card
    async criar(req: Request, res: Response) {
        const { titulo, descricao, estagioId, dataEntrega } = req.body;

        try {
            const cardServico = new CardServico();
            const card = await cardServico.criarCard(titulo, descricao, estagioId, dataEntrega);
            return res.status(201).json(card);
        } catch (error) {
            console.error('Erro ao criar card:', error);
            return res.status(400).json({ message: 'Erro ao criar card' });
        }
    }

    // Método para listar todos os cards de um estágio específico
    async listar(req: Request, res: Response) {
        const estagioId = req.query.estagioId as string;

        try {
            const cardServico = new CardServico();
            const cards = await cardServico.listarCards(estagioId);
            return res.status(200).json(cards);
        } catch (error) {
            console.error('Erro ao listar cards:', error);
            return res.status(400).json({ message: 'Erro ao listar cards' });
        }
    }

    // Método para recuperar um card específico pelo seu ID
    async recuperar(req: Request, res: Response) {
        const id = req.params.id as string;

        try {
            const cardServico = new CardServico();
            const card = await cardServico.recuperarCard(id);
            return res.status(200).json(card);
        } catch (error) {
            console.error('Erro ao recuperar card:', error);
            return res.status(400).json({ message: 'Erro ao recuperar card' });
        }
    }

    // Método para atualizar um card existente
    async atualizar(req: Request, res: Response) {
        const { id, titulo, descricao, dataEntrega } = req.body;

        try {
            const cardServico = new CardServico();
            const card = await cardServico.atualizarCard(id, titulo, descricao, dataEntrega);
            return res.status(200).json(card);
        } catch (error) {
            console.error('Erro ao atualizar card:', error);
            return res.status(400).json({ message: 'Erro ao atualizar cards' });
        }
    }

    // Método para excluir um card
    async excluir(req: Request, res: Response) {
        const id = req.params.id as string;

        try {
            const cardServico = new CardServico();
            const card = await cardServico.excluirCard(id);
            return res.status(200).json(card);
        } catch (error) {
            console.error('Erro ao excluir card:', error);
            return res.status(400).json({ message: 'Erro ao excluir card' });
        }
    }
}

export { CardController };
