import prismaClient from "../../prisma";

class ListarProjetosServico {
    async execute(usuarioId: string) {
        if (!usuarioId) {
            throw new Error('ID do usuário é obrigatório');
        }

        // Projetos onde o usuário é proprietário
        const projetosProprietario = await prismaClient.projeto.findMany({
            where: {
                usuarioId: usuarioId,
            },
            select: {
                id_projeto: true,
                titulo: true,
                descricao: true,
                dataCriacao: true,
                background: true,
            },
        });

        // Projetos onde o usuário é participante
        const projetosParticipante = await prismaClient.projeto.findMany({
            where: {
                participacoes: {
                    some: {
                        usuarioId: usuarioId,
                    },
                },
            },
            select: {
                id_projeto: true,
                titulo: true,
                descricao: true,
                dataCriacao: true,
                background: true,
            },
        });

        // Combine os projetos em uma lista
        const projetos = [...projetosProprietario, ...projetosParticipante];

        return projetos;
    }
}

export { ListarProjetosServico };
