import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware, functionalLogger } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';

// app module used for registering providers
@Module({
  imports: [CatsModule],
  controllers: [AppController],
  // services, repositories, factories, helpers, etc.. Allows to inject them
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    // applying multiple middlewares
    consumer
      // middlewares get called in this order of apply
      .apply(LoggerMiddleware, functionalLogger)
      .exclude(
        // exlude these paths from the middleware
        { path: '/cats', method: RequestMethod.ALL },
        { path: '/cats/:id', method: RequestMethod.GET })
      // target CatsController for middleware
      .forRoutes(CatsController);
  }
}
