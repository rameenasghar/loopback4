import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Category} from './category.model';

@model({settings:
  {
    strict: true,
    postgresql: {schema: 'public', table: 'Classified'}
  }
})
export class Classified extends Entity {
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

  @belongsTo(
    () => Category,
    {},
    {
      type: 'number',
      scale: 0,
      postgresql: {
        columnName: 'category_id',
        dataType: 'integer',
        nullable: 'YES',
      },
    },
  )
  categoryId?: number;

  @property({
    type: 'string',
    required: true,
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

  @property({
    type: 'string',
    scale: 0,
    postgresql: {
      columnName: 'description',
      dataType: 'character varying',
      dataLength: 500,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  description?: string;

  @property({
    type: 'number',
    scale: 0,
    required: true,
    postgresql: {
      columnName: 'prices',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  prices: number;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'status',
      dataType: 'boolean',
      nullable: 'NO',
    },
  })
  status: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Classified>) {
    super(data);
  }
}

export interface ClassifiedRelations {
  // describe navigational properties here
}

export type ClassifiedWithRelations = Classified & ClassifiedRelations;
