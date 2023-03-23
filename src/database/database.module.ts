import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        logging: configService.get<boolean>('DB_LOG'),
        synchronize: true,
        migrationsRun: false,
        migrationsTransactionMode: 'each',
        migrations: [__dirname + '/migrations/*.{ts,js}'],
      }),
    }),
  ],
})
export class DatabaseModule {}
