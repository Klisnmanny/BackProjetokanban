import prismaClient from "../../prisma";

class CardServico {
    // Método para listar todos os cards de um estágio específico
    async listarCards(estagioId: string) {
        if (!estagioId) {
            throw new Error('ID do estágio é obrigatório');
        }

        // Busca todos os cards pelo ID do estágio
        const cards = await prismaClient.card.findMany({
            where: { estagioId },
        });

        return cards;
    }

    // Método para recuperar um card específico pelo seu ID
    async recuperarCard(id: string) {
        if (!id) {
            throw new Error('ID do card é obrigatório');
        }

        // Busca o card pelo ID
        const card = await prismaClient.card.findUnique({
            where: { id_card: id },
        });

        if (!card) {
            throw new Error('Card não encontrado');
        }

        return card;
    }

    // Método para criar um novo card
    async criarCard(titulo: string, descricao: string, estagioId: string, dataEntrega?: Date) {
        if (!titulo || !estagioId) {
            throw new Error('Título do card e ID do estágio são obrigatórios');
        }

        // Cria um novo card
        const card = await prismaClient.card.create({
            data: {
                titulo,
                descricao,
                estagioId,
                dataEntrega,
            },
        });

        return card;
    }

    // Método para atualizar um card existente
    async atualizarCard(id: string, titulo: string, descricao?: string, dataEntrega?: Date) {
        if (!id || !titulo) {
            throw new Error('ID do card e título são obrigatórios');
        }

        // Atualiza os dados do card
        const card = await prismaClient.card.update({
            where: { id_card: id },
            data: {
                titulo,
                descricao,
                dataEntrega,
            },
        });

        return card;
    }

    // Método para excluir um card
    async excluirCard(id: string) {
        if (!id) {
            throw new Error('ID do card é obrigatório');
        }

        // Exclui o card pelo ID
        const card = await prismaClient.card.delete({
            where: { id_card: id },
        });

        return card;
    }
}

export { CardServico };
