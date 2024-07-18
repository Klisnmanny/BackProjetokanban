import { Router, Request, Response } from "express"; // Importa as classes Router, Request e Response do Express
import { CriarUsuarioController } from "../Controller/Usuarios/CriarUsuariosController";
import { AutenticaUsuarioController } from "../Controller/Usuarios/AutenticaUsuariosController";
import { DetalheUsuarioController } from "../Controller/Usuarios/DetalheUsuariosController";
import { CriarProjetosController } from "../Controller/Projetos/CriarProjetosController";
import { ListarProjetosController } from "../Controller/Projetos/ListarProjetosController";
import { ExcluirProjetoController } from "../Controller/Projetos/ExcluirProjetoController";
import { AdicionarParticipanteController } from "../Controller/Participar/AdicionarParticipanteController";
import { ExcluirParticipacaoController } from "../Controller/Participar/ExcluirParticipacaoController";
import { EstagioController } from "../Controller/Estagios/EstagioController";
import { CardController } from "../Controller/Cards/CardController";
import { autenticacao } from "../Middleware/Autenticar";

const router = Router(); // Cria uma instância do roteador do Express

// Define as rotas para a API

//////////////////////// USUARIOS     ////////////////////////////////////
// Rota para salvar um novo usuário
router.post('/usuario',new CriarUsuarioController().handle);

// Rota para autenticar
router.post('/login',new AutenticaUsuarioController().handle);
// Usa o método POST para a URL '/usuario'. O controlador CriarUsuarioController lida com a solicitação.

//Detalhes do usuario
router.get('/detalhe', autenticacao, new DetalheUsuarioController().handle);




//////////////////////// PROJETOS     ////////////////////////////////////

//Criar projeto
router.post('/projeto', autenticacao, new CriarProjetosController().handle);

//Listar projetos
router.get('/projetos',autenticacao, new ListarProjetosController().handle);

//Excluir projeto
router.delete('/projeto',autenticacao, new ExcluirProjetoController().handle);






//////////////////////// PARTICIPAÇÃO    ////////////////////////////////////

//Adicionar participação
router.post('/projeto/participar',autenticacao, new AdicionarParticipanteController().handle);

//Excluir participação
router.delete('/projeto/apagarparticipar',autenticacao, new ExcluirParticipacaoController().handle);



//////////////////////// Estagios    ////////////////////////////////////


// Rota para criar um novo estágio

router.post('/estagio',autenticacao, new EstagioController().criar);

// Rota para listar todos os estágios de um projeto específico
router.get('/projetos',autenticacao, new EstagioController().listar);

// Rota para recuperar um estágio específico pelo seu ID
router.get('/estagio/:id',autenticacao, new EstagioController().recuperar);

// Rota para atualizar um estágio existente
router.put("/estagio",autenticacao, new EstagioController().atualizar);

// Rota para excluir um estágio pelo seu ID
router.delete("/estagio/:id",autenticacao, new EstagioController().excluir);


//////////////////////// CARDS    ////////////////////////////////////


// Rota para criar um novo card
router.post("/card",autenticacao, new CardController().criar);

// Rota para listar todos os cards de um estágio específico
router.get("/cards",autenticacao, new CardController().listar);

// Rota para recuperar um card específico pelo seu ID
router.get("/card/:id",autenticacao, new CardController().recuperar);

// Rota para atualizar um card existente
router.put("/card",autenticacao, new CardController().atualizar);

// Rota para excluir um card pelo seu ID
router.delete("/card/:id",autenticacao, new CardController().excluir);




export { router }; // Exporta o roteador para ser usado em outros arquivos, como no arquivo principal do servidor