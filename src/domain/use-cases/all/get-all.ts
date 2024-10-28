import { AllEntity } from "../../entities/all.entity";
import { AllRepository } from "../../repositories/all.repository";

export interface GetTodoUseCase {
    execute(id: number): Promise<AllEntity>
}

export class GetAll implements GetTodoUseCase {

    constructor(
        private readonly repository: AllRepository
    ){}

    execute(id: number): Promise<AllEntity> {
        return this.repository.findById(id);
    }

}