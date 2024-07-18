import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UsuarioRequest{
    nome:string,
    senha:string
}


class CriarUsuarioServico{
    async execute({nome,senha}:UsuarioRequest){

        if(!nome ||!senha){
            throw new Error('Login invalido ou senha invalido')
        }
        const usuarioExiste = await prismaClient.usuario.findFirst({
            where:{
                nome:nome
            }
        })

        if(usuarioExiste){
            throw new Error('Login ja existe')
        }

        
        const senhaHash = await hash(senha,12)

        const usuarios = await prismaClient.usuario.create({
            data:{
                nome:nome,
                senha:senhaHash
            },
            select:{
                id_usuario:true,
                nome:true
            }
        })

        return usuarios

    }
}

export{CriarUsuarioServico}