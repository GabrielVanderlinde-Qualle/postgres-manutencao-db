process.env.TZ = 'America/Brasilia'; // Força o fuso horário
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma o JSON recebido nos tipos do DTO automaticamente
      whitelist: true, // Remove campos que não estão no DTO (segurança)
      forbidNonWhitelisted: true, // Dá erro se mandarem campo "pirata"
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
