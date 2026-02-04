process.env.TZ = 'America/Sao_Paulo';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Manutenção API')
    .setDescription('API para Manutenções')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

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
