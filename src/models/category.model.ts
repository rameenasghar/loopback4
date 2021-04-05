import {Entity, model, property, hasMany} from '@loopback/repository';
import {Classified} from './classified.model';

@model({settings:
  {
    strict: true,
    postgresql: {schema: 'public', table: 'Category'}
  }
})
export class Category extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id?: number;

  @property({
    type: 'string',
    scale: 0,
    postgresql: {
      columnName: 'title',
      dataType: 'character varying',
      dataLength: 50,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  title: string;

  @hasMany(() => Classified)
  classifieds: Classified[];
  [prop: string]: any;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
