import { IsString, IsInt, MinLength } from "class-validator";

export class CreateCatDto {
    @IsString()
    @MinLength(4, {
        message: "Title is too short. Minimal length is 4"
    })
    name!: string;

    @IsInt()
    age!: number;

    @IsString()
    breed!: string;
}

export class ListAllEntities {
    readonly limit!: number;
}

export class UpdateCatDto {
    name?: string;
    age?: number;
    breed?: string;
}
