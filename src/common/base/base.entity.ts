import { Merchant } from '@constants/merchant';
import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
  Column,
  Index,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt?: Date;
}

export class TenancyEntity {
  @Column({ name: 'tenant_id', nullable: true, default: null })
  @Index()
  @Exclude()
  tenantId?: string;
}
