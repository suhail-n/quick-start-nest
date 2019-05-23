import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    controllers: [CatsController],
    providers: [CatsService]
})
// this needs to be imported in the root module under imports or just directly import cats controllers and services which is bad practice
export class CatsModule { }
