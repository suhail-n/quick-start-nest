import { Controller, Body, Post, HttpCode, Get, Query, Delete, Put, Param, Req, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateCatDto, ListAllEntities } from './dto/dto';
import { Response, Request } from "express";
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {

    // CatsService is injected
    constructor(private readonly catsService: CatsService) { }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
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
