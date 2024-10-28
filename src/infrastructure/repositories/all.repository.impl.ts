import { AllDatasource, AllEntity, AllRepository, CreateAllDto, UpdateAllDto } from "../../domain";

export class AllRepositoryImpl implements AllRepository {

    constructor(
        private readonly datasource: AllDatasource,
    ) {}

    create(createAllDto: CreateAllDto): Promise<AllEntity> {
        return this.datasource.create(createAllDto);
    }
    
    getAll(): Promise<AllEntity[]> {
        return this.datasource.getAll();
    }

    findById(id: number): Promise<AllEntity> {
        return this.datasource.findById(id);
    }

    updateById(updateAllDto: UpdateAllDto): Promise<AllEntity> {
        return this.datasource.updateById(updateAllDto);
    }

    deleteById(id: number): Promise<AllEntity> {
        return this.datasource.deleteById(id);
    }

}