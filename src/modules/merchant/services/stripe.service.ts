import { MerchantService } from '@base/merchant.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService implements MerchantService {
  generateClientToken(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
