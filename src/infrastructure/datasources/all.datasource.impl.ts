import { prisma } from "../../data/postgres";
import { AllDatasource, AllEntity, CreateAllDto, UpdateAllDto } from "../../domain";

export class AllDatasourceImpl implements AllDatasource {

    async create(createAllDto: CreateAllDto): Promise<AllEntity> {
        const all = await prisma.all.create({
            data: createAllDto! 
        });

        return AllEntity.fromObject(all);
    }

    async getAll(): Promise<AllEntity[]> {
        const all = await prisma.all.findMany();
        return all.map(all => AllEntity.fromObject(all));
    }

    async findById(id: number): Promise<AllEntity> {
        const result = await prisma.all.findFirst({
            where: {id}
        });

        if(!result) throw new Error(`All with id ${id} not found`);
        return AllEntity.fromObject(result);
    }

    async updateById(updateAllDto: UpdateAllDto): Promise<AllEntity> {
        await this.findById(updateAllDto.id!);

        const updateAll = await prisma.all.update({
            where: {id: updateAllDto.id},
            data: updateAllDto!.values
        });

        return AllEntity.fromObject(updateAll);
    }

    async deleteById(id: number): Promise<AllEntity> {
        await this.findById(id);
        await prisma.all.delete({where: {id}});

        return AllEntity.fromObject({id});
    }

}