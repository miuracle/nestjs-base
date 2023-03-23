import { NestFactory, Reflector } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import setupSwagger from './swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import { I18nModule, I18nService } from 'nestjs-i18n';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const i18nService: I18nService<Record<string, unknown>> = app.select(AppModule).get(I18nService);

  app.useGlobalFilters(new AppExceptionFilter(i18nService));

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableCors();

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
