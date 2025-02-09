import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter'
import { AppModule } from './app.module'
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Api Doc example')
    .setDescription('The api exemple  description')
    .setVersion('1.0')
    .addTag('Api Doc Exemple')
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, documentFactory)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new NotFoundExceptionFilter(),
    new AllExceptionsFilter(),
  )

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
