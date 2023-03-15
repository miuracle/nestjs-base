import { validate } from '@common/env.validation';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate,
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        level: configService.get<string>('LOG_LEVEL'),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike(configService.get<string>('APP_NAME')),
            ),
          }),
        ],
      }),
    }),
    SharedModule,
    DatabaseModule,
  ],
})
export class AppModule {}
