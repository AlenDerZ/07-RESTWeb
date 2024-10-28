
export class TodoEntity {

    constructor(
        public id: number,
        public name: string,
        public completedAt?: Date|null
    ){}

    get isCompleted() {
        return !!this.completedAt;
    }
}