import { Module } from '@nestjs/common';

const services = [];

@Module({
  providers: services,
  exports: services,
})
export class SharedModule {}
