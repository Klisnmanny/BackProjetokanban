import prismaClient from "../../prisma"

class DetalheUsuarioServico{
    async execute(user_id:string){
        const usuario =await prismaClient.usuario.findFirst({
            where:{
                id_usuario: user_id
            },
            select:{
                id_usuario:true,
                nome:true,
            }
        })

        return usuario
    }
}

export {DetalheUsuarioServico}