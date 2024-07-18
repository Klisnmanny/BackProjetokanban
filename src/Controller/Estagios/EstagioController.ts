import { Request, Response } from "express";
import { EstagioServico } from "../../Services/Estagios/EstagioServico";

class EstagioController {
    // Método para criar um novo estágio
    async criar(req: Request, res: Response) {
        // Extrai o nome do estágio e o ID do projeto do corpo da requisição
        const { nome, projetoId } = req.body;

        try {
            const estagioServico = new EstagioServico();
            // Cria um novo estágio usando o serviço
            const estagio = await estagioServico.criarEstagio(nome, projetoId);
            return res.status(201).json(estagio); // Retorna o estágio criado com status 201 (Created)
        } catch (error) {
            console.error('Erro ao criar estágio:', error);
            
            return res.status(400).json({ message: 'Estagio nao criado' });
        }
    }

    // Método para listar todos os estágios de um projeto específico
    async listar(req: Request, res: Response) {
        // Extrai o ID do projeto dos parâmetros de consulta da requisição
        const projetoId = req.query.projetoId as string;

        try {
            const estagioServico = new EstagioServico();
            // Lista todos os estágios do projeto usando o serviço
            const estagios = await estagioServico.listarEstagios(projetoId);
            return res.status(200).json(estagios); // Retorna a lista de estágios com status 200 (OK)
        } catch (error) {
            console.error('Erro ao listar estágios:', error);
            return res.status(400).json({ message: 'Estagio nao listado' }); // Retorna um erro com status 400 (Bad Request)
        }
    }

    // Método para recuperar um estágio específico pelo seu ID
    async recuperar(req: Request, res: Response) {
        // Extrai o ID do estágio dos parâmetros da URL
        const id = req.params.id as string;

        try {
            const estagioServico = new EstagioServico();
            // Recupera o estágio específico usando o serviço
            const estagio = await estagioServico.recuperarEstagio(id);
            return res.status(200).json(estagio); // Retorna o estágio com status 200 (OK)
        } catch (error) {
            console.error('Erro ao recuperar estágio:', error);
            return res.status(400).json({ message: 'Problema ao recuperar estagio' });// Retorna um erro com status 400 (Bad Request)
        }
    }

    // Método para atualizar um estágio existente
    async atualizar(req: Request, res: Response) {
        // Extrai o ID do estágio e o novo nome do corpo da requisição
        const { id, nome } = req.body;

        try {
            const estagioServico = new EstagioServico();
            // Atualiza o estágio usando o serviço
            const estagio = await estagioServico.atualizarEstagio(id, nome);
            return res.status(200).json(estagio); // Retorna o estágio atualizado com status 200 (OK)
        } catch (error) {
            console.error('Erro ao atualizar estágio:', error);
            return res.status(400).json({ message: 'Estagio nao atualizado' }); // Retorna um erro com status 400 (Bad Request)
        }
    }

    // Método para excluir um estágio pelo seu ID
    async excluir(req: Request, res: Response) {
        // Extrai o ID do estágio dos parâmetros da URL
        const id = req.params.id as string;

        try {
            const estagioServico = new EstagioServico();
            // Exclui o estágio usando o serviço
            const estagio = await estagioServico.excluirEstagio(id);
            return res.status(200).json(estagio); // Retorna o estágio excluído com status 200 (OK)
        } catch (error) {
            console.error('Erro ao excluir estágio:', error);
            return res.status(400).json({ message: 'Estagio nao excluido' }); // Retorna um erro com status 400 (Bad Request)
        }
    }
}

export { EstagioController };
