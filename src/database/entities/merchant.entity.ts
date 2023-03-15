import { BaseEntity } from '@base/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'merchants' })
export class Merchant<T> extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'currency' })
  currency: string;

  @Column({ name: 'conf', type: 'jsonb' })
  conf: T;

  @Column({ name: 'fee', type: 'decimal', precision: 2, scale: 2, default: 0 })
  fee: number;

  @Column({ name: 'status' })
  status: boolean;
}
