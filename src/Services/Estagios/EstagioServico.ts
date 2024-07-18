import prismaClient from "../../prisma";

class EstagioServico {
    // Método para listar todos os estágios de um projeto específico
    async listarEstagios(projetoId: string) {
        // Verifica se o ID do projeto foi fornecido
        if (!projetoId) {
            throw new Error('ID do projeto é obrigatório');
        }

        // Busca todos os estágios associados ao projeto especificado no banco de dados
        const estagios = await prismaClient.estagio.findMany({
            where: { projetoId }, // Filtra os estágios pelo ID do projeto
        });

        return estagios; // Retorna a lista de estágios encontrados
    }

    // Método para recuperar um estágio específico pelo seu ID
    async recuperarEstagio(id: string) {
        // Verifica se o ID do estágio foi fornecido
        if (!id) {
            throw new Error('ID do estágio é obrigatório');
        }

        // Busca o estágio com o ID especificado no banco de dados
        const estagio = await prismaClient.estagio.findUnique({
            where: { id_estagio: id }, // Filtra o estágio pelo ID
        });

        // Verifica se o estágio foi encontrado
        if (!estagio) {
            throw new Error('Estágio não encontrado');
        }

        return estagio; // Retorna o estágio encontrado
    }

    // Método para criar um novo estágio
    async criarEstagio(nome: string, projetoId: string) {
        // Verifica se o nome do estágio e o ID do projeto foram fornecidos
        if (!nome || !projetoId) {
            throw new Error('Nome do estágio e ID do projeto são obrigatórios');
        }

        // Cria um novo estágio no banco de dados
        const estagio = await prismaClient.estagio.create({
            data: {
                nome,
                projetoId,
            },
        });

        return estagio; // Retorna o estágio criado
    }

    // Método para atualizar um estágio existente
    async atualizarEstagio(id: string, nome: string) {
        // Verifica se o ID do estágio e o novo nome foram fornecidos
        if (!id || !nome) {
            throw new Error('ID do estágio e nome são obrigatórios');
        }

        // Atualiza o estágio com o novo nome no banco de dados
        const estagio = await prismaClient.estagio.update({
            where: { id_estagio: id }, // Filtra o estágio pelo ID
            data: { nome }, // Atualiza o nome do estágio
        });

        return estagio; // Retorna o estágio atualizado
    }

    // Método para excluir um estágio pelo seu ID
    async excluirEstagio(id: string) {
        // Verifica se o ID do estágio foi fornecido
        if (!id) {
            throw new Error('ID do estágio é obrigatório');
        }

        // Exclui o estágio com o ID especificado no banco de dados
        const estagio = await prismaClient.estagio.delete({
            where: { id_estagio: id }, // Filtra o estágio pelo ID
        });

        return estagio; // Retorna o estágio excluído
    }
}

export { EstagioServico };
