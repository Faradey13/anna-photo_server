import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: 'http://localhost:5173', // Домен вашего клиента
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,

  });

  const config = new DocumentBuilder()
    .setTitle('Сайт-портфолио')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Gipp')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
