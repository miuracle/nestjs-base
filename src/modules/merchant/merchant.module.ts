import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';

const providers = [StripeService];

@Module({
  providers,
  exports: providers,
})
export class MerchantModule {}
