import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

// Interface para os dados de autenticação
interface AutenticaUsuario {
    nome: string;
    senha: string;
}

class AutenticaUsuarioServico {
    async execute({ nome, senha }: AutenticaUsuario) {
        // Busca o usuário no banco de dados pelo nome
        const usuario = await prismaClient.usuario.findFirst({
            where: {
                nome: nome, // Usa o nome do usuário para buscar no banco
            }
        });

        // Verifica se o usuário foi encontrado
        if (!usuario) {
            throw new Error("Login ou senha inválido"); // Se não encontrar, lança um erro
        }

        // Compara a senha fornecida com a senha armazenada no banco
        const senhaValida = await compare(senha, usuario.senha);
        
        if (!senhaValida) {
            throw new Error("Login ou senha inválido"); // Se a senha não corresponder, lança um erro
        }

        // Verifica se a variável de ambiente JWT_SECRET está definida
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET não está definido nas variáveis de ambiente");
        }

        // Gerar token para o usuário
        const token = sign(
            { nome: usuario.nome }, // Payload do token
            jwtSecret, // Chave secreta para assinar o token
            {
                subject: usuario.id_usuario, // ID do usuário como subject
                expiresIn: "1d", // Token expira em 1 dia
            }
        );

        // Retorna um objeto com os dados do usuário e o token gerado
        return {
            id: usuario.id_usuario,
            login: usuario.nome,
            token: token,
        };
    }
}

export { AutenticaUsuarioServico };