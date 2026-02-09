// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para que Next.js pueda consultar la API
  app.enableCors({
    origin: ['http://localhost:3000'], // URL local de Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(4000); // Puerto diferente al de Next.js
}
bootstrap();
