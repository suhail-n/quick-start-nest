import { Controller, Body, Post, HttpCode, Get, Query, Delete, Put, Param, Req, Res, HttpStatus, BadRequestException, UseFilters, ConflictException, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateCatDto, ListAllEntities } from './dto/dto';
import { Response, Request } from "express";
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
// import must be relative path. Absoulte from src will fail
import { HttpExceptionFilter } from "../common/exception/http-exception.filter";
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('cats')
// use the roles guard on each route
@UseGuards(RolesGuard)
// can also use Filter at controller level rather than method level
// @UseFilters(new HttpExceptionFilter())
export class CatsController {

    // CatsService is injected
    constructor(private readonly catsService: CatsService) {
    }

    @Post()
    // set metadata to route handler for roles which can be seen in auth.gaurd
    @Roles('admin')
    // can validate using use pipe
    // @UsePipes(new ValidationPipe())
    // can also validate by using the route param body
    // this validation is a built in validation
    async create(@Body(new ValidationPipe({ transform: true })) createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Cat | {}> {
        return this.catsService.findById(id)
    }

    // use express request and response here so I can place my own http status code
    @Put(':id')
    // using custom exception filter
    @UseFilters(new HttpExceptionFilter())
    async update(@Req() req: Request, @Res() res: Response): Promise<any> {
        let result: boolean = this.catsService.updateCat(req.params.id, req.body);
        if (result === false) {
            // exception will return the Bad Request status code with the message added
            throw new BadRequestException("ID Does not Exist");
        }
        res.status(HttpStatus.OK).send();
    }

    @Delete(':id')
    // I need my own HttpCode defined since delete does 200 OK by default.
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<any> {
        this.catsService.remove(id);
    }
}
