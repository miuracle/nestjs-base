import { BaseEntity } from '@common/base/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ name: 'username' })
  username: string;
}
