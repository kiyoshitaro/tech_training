import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // (3) global pipes: no-need to delare in each controller 
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
