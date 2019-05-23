import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  // services, repositories, factories, helpers, etc.. Allows to inject them
  providers: [AppService],
})
export class AppModule { }
