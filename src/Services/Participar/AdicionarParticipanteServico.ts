import prismaClient from "../../prisma";

class AdicionarParticipanteServico {
    async execute(projetoId: string, usuarioId: string) {
        if (!projetoId || !usuarioId) {
            throw new Error('ID do projeto e ID do usuário são obrigatórios');
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

        // Verificar se o usuário existe
        const usuario = await prismaClient.usuario.findUnique({
            where: {
                id_usuario: usuarioId,
            },
        });

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // Adicionar participação
        const participacao = await prismaClient.participacao.create({
            data: {
                projetoId: projetoId,
                usuarioId: usuarioId,
            },
        });

        return participacao;
    }
}

export { AdicionarParticipanteServico };
