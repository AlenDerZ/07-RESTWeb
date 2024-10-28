import { AllEntity } from "../../entities/all.entity";
import { AllRepository } from "../../repositories/all.repository";

export interface DeleteAllUseCase {
    execute(id: number): Promise<AllEntity>
}

export class DeleteAll implements DeleteAllUseCase {

    constructor(
        private readonly repository: AllRepository
    ){}

    execute(id: number): Promise<AllEntity> {
        return this.repository.deleteById(id);
    }

}