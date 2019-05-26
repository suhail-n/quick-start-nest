import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { functionalLogger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // use logger middle ware on every registered route at once.
  // app.use(functionalLogger);
  await app.listen(3000);
}
bootstrap();
