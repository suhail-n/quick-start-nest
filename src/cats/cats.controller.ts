import { Controller, Body, Post, HttpCode, Get, Query, Delete, Put, Param, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto';
import { Response, Request } from "express";

@Controller('cats')
export class CatsController {

    @Post()
    async create(@Body() createCatDto: CreateCatDto): Promise<CreateCatDto> {
        return createCatDto;
    }

    @Get()
    async findAll(@Query() query: ListAllEntities): Promise<string> {
        return `This action returns all cats (limit: ${query.limit} items)`;
    }

    // use express request and response here
    @Get(':id')
    async findOne(@Req() req: Request, @Res() res: Response): Promise<any> {
        res.status(HttpStatus.OK).send(`This action returns a #${req.params.id} cat`)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<any> {
        return `This action updates a #${id} cat[${JSON.stringify(updateCatDto)}]`;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<any> {
        return `This action removes a #${id} cat`;
    }
}
