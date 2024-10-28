import { CreateAllDto } from "../../dtos";
import { AllEntity } from "../../entities/all.entity";
import { AllRepository } from "../../repositories/all.repository";

export interface CreateAllUseCase {
    execute(dto: CreateAllDto): Promise<AllEntity>
}

export class CreateAll implements CreateAllUseCase {

    constructor(
        private readonly repository: AllRepository
    ){}

    execute(dto: CreateAllDto): Promise<AllEntity> {
        return this.repository.create(dto);
    }

}