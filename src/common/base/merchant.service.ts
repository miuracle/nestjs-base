import { ConfigService } from '@nestjs/config';

export interface MerchantService {
  generateClientToken(): Promise<string>;
}
