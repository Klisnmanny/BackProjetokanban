import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// Interface para o payload do token
interface Payload {
    sub: string;
}

// Extensão da interface Request para adicionar a propriedade user_id
declare global {
    namespace Express {
        interface Request {
            user_id?: string; // Adiciona a propriedade user_id ao Request
        }
    }
}

export function autenticacao(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Obtém o token da autorização
    const autenticarToken = req.headers.authorization;

    // Verifica se o token está presente
    if (!autenticarToken) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Divide o header de autorização para obter o token
    const [, token] = autenticarToken.split(' ');

    try {
        // Verifica o token e extrai o payload
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

        // Adiciona o ID do usuário à requisição
        req.user_id = sub;

        // Continua para o próximo middleware ou rota
        return next();
    } catch (error) {
        // Retorna um erro 401 se o token não for válido
        return res.status(401).json({ error: 'Token inválido' });
    }
}
