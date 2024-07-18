import prismaClient from "../../prisma";

class ExcluirParticipacaoServico {
    async execute(projetoId: string, usuarioId: string, solicitanteId: string) {
        if (!projetoId || !usuarioId || !solicitanteId) {
            throw new Error('ID do projeto, ID do usuário e ID do solicitante são obrigatórios');
        }



        // Verificar se o projeto existe
        const projeto = await prismaClient.projeto.findUnique({
            where: {
                id_projeto: projetoId,
            },
        });

        if (!projeto) {
            throw new Error('Projeto não encontrado');
        }

        // Verificar se o solicitante é o proprietário do projeto
        if (projeto.usuarioId !== solicitanteId) {
            throw new Error('Apenas o proprietário do projeto pode remover participantes');
        }

        // Verificar se a participação existe
        const participacao = await prismaClient.participacao.findUnique({
            where: {
                usuarioId_projetoId: {
                    usuarioId: usuarioId,
                    projetoId: projetoId,
                },
            },
        });

        if (!participacao) {
            throw new Error('Participação não encontrada');
        }

        // Excluir a participação
        await prismaClient.participacao.delete({
            where: {
                usuarioId_projetoId: {
                    usuarioId: usuarioId,
                    projetoId: projetoId,
                },
            },
        });

        return { message: 'Participação removida com sucesso' };
    }
}

export { ExcluirParticipacaoServico };
