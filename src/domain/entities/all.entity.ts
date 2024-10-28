
export class AllEntity {

    constructor(
        public id: number,
        public name: string,
        public completedAt?: Date|null
    ){}

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject(object: {[key: string]: any}): AllEntity {
        const { id, name, completedAt } = object;

        if(!id) throw 'Id is required';
        if(!name) throw 'Name is required';
        
        let newCompletedAt;
        if(completedAt) {
            newCompletedAt = new Date(completedAt);
            if(isNaN(newCompletedAt.getTime())){
                throw 'CompletedAt must be a valid date';
            }
        }

        return new AllEntity(id, name, newCompletedAt)

    }
}