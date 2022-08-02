import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // port
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  // Swagger settings
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('2.0.1')
    .addServer(`http://localhost:${port}`)
    .addBearerAuth(
      {
        in: 'header',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validation Pipeline settings
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log(`Application is running on localhost:${port}`);
}
bootstrap();
