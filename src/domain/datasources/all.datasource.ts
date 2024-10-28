import { CreateAllDto, UpdateAllDto } from "../dtos";
import { AllEntity } from "../entities/all.entity";

export abstract class AllDatasource {

    abstract create(createAllDto: CreateAllDto): Promise<AllEntity>;

    //todo: paginación
    abstract getAll(): Promise<AllEntity[]>;

    abstract findById(id: number): Promise<AllEntity>;

    abstract updateById(updateAllDto: UpdateAllDto): Promise<AllEntity>;

    abstract deleteById(id: number): Promise<AllEntity>;
}