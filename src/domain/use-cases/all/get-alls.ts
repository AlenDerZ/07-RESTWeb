import { AllEntity } from "../../entities/all.entity";
import { AllRepository } from "../../repositories/all.repository";

export interface GetTodosUseCase {
    execute(): Promise<AllEntity[]>
}

export class GetAlls implements GetTodosUseCase {

    constructor(
        private readonly repository: AllRepository
    ){}

    execute(): Promise<AllEntity[]> {
        return this.repository.getAll();
    }

}