import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    const config = new DocumentBuilder()
        .setTitle('Luminaa.Chat')
        .setDescription('The luminaa.chat API description')
        .setVersion('1.0')
        .addServer('http://localhost:3000/')
        .addBearerAuth()
        .setExternalDoc('Docs Luminaa.Chat', 'https://docs.luminaa.chat')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./openapi/luminaa-openapi-spec.json', JSON.stringify(document));
    SwaggerModule.setup('docs', app, document);

    app.enableCors();

    await app.listen(process.env.APP_PORT);

    console.log(`Start App on Port ${process.env.APP_PORT}`);
}
bootstrap();
