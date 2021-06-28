import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @ObjectIdColumn({
    generated: false,
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'simple-enum',
    nullable: false,
  })
  role: string;
}
