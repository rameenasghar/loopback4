import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Classified extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  category_id: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  prices: number;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'number',
  })
  categoryId?: number;
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
