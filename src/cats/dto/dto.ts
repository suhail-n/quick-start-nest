export class CreateCatDto {
    readonly name!: string;
    readonly age!: number;
    readonly breed!: string;
}

export class ListAllEntities {
    readonly limit!: number;
}

export class UpdateCatDto {
    name?: string;
    age?: number;
    breed?: string;
}
