
export class CreateAllDto {

    private constructor(
        public readonly name: string
    ){}

    static create(props: {[key:string]: any}): [string?, CreateAllDto?] {
        
        const { name } = props;

        if(!name) return ['Name property is required', undefined];
        
        return [undefined, new CreateAllDto(name)];
    }
}