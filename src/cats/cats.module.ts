import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// with global, modules will no longer need to import CatsModule in their imports array
// @Global()
@Module({
    controllers: [CatsController],
    providers: [CatsService]
})
// this needs to be imported in the root module under imports or just directly import cats controllers and services which is bad practice
export class CatsModule {

    // configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    //     // applying multiple middlewares
    //     consumer
    //         .apply(LoggerMiddleware, functionalLogger)
    //         .exclude({ path: 'cats', method: RequestMethod.PUT })
    //         .forRoutes(CatsController);
    // }
}
