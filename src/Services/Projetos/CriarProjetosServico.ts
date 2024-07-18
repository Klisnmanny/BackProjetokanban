import prismaClient from "../../prisma";

interface ProjetoRequest {
  titulo: string;
  descricao?: string; // descrição é opcional
  usuarioId: string;  // Adicionar o usuário ao qual o projeto pertence
}

class CriarProjetoServico {
  async execute({ titulo, descricao, usuarioId }: ProjetoRequest) {
    if (!titulo || !usuarioId) {
      throw new Error('Título do projeto e ID do usuário são obrigatórios');
    }

    // Verificar se o projeto com o título fornecido já existe
    const projetoExistente = await prismaClient.projeto.findFirst({
      where: {
        titulo: titulo,
      },
    });

    if (projetoExistente) {
      throw new Error('Projeto com este título já existe');
    }

    // Criar um novo projeto
    const projeto = await prismaClient.projeto.create({
      data: {
        titulo: titulo,
        descricao: descricao,
        usuarioId: usuarioId, 
      },
      select: {
        id_projeto: true,
        titulo: true,
        descricao: true,
        dataCriacao: true,
        usuarioId:true
      },
    });

    return projeto;
  }
}

export { CriarProjetoServico };

