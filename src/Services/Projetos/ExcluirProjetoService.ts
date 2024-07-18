import prismaClient from "../../prisma";

interface ApagarRequest{
    id_projeto:string;
}

class ExcluirProjetoService{
    async execute({id_projeto}:ApagarRequest){
        const apagar = await prismaClient.projeto.delete({
            where:{
                id_projeto:id_projeto
            }
        })

        return apagar
    }
}

export {ExcluirProjetoService}