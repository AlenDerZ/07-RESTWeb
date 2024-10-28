import { UpdateAllDto } from "../../dtos";
import { AllEntity } from "../../entities/all.entity";
import { AllRepository } from "../../repositories/all.repository";

export interface UpdateAllUseCase {
    execute(dto: UpdateAllDto): Promise<AllEntity>
}

export class UpdateAll implements UpdateAllUseCase {

    constructor(
        private readonly repository: AllRepository
    ){}

    execute(dto: UpdateAllDto): Promise<AllEntity> {
        return this.repository.updateById(dto);
    }
}