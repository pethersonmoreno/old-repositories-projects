import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export default class Pokemon {
  @ObjectIdColumn()
  _id: string;

  @Column({
    type: 'integer',
    nullable: false,
    unique: true,
  })
  pokemonId: number;

  @Column({
    type: 'string',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  type: string;
}
