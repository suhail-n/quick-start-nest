import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/exception/http-exception.filter';
// import { functionalLogger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // use logger middle ware on every registered route at once.
  // app.use(functionalLogger);

  // Exception filters can also be used globally like this.
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
