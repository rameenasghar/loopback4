import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Category,
  Classified,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryClassifiedController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/classifieds', {
    responses: {
      '200': {
        description: 'Array of Category has many Classified',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Classified)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Classified>,
  ): Promise<Classified[]> {
    return this.categoryRepository.classifieds(id).find(filter);
  }

  @post('/categories/{id}/classifieds', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Classified)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classified, {
            title: 'NewClassifiedInCategory',
            exclude: ['category_id'],
            optional: ['categoryId']
          }),
        },
      },
    }) classified: Omit<Classified, 'category_id'>,
  ): Promise<Classified> {
    return this.categoryRepository.classifieds(id).create(classified);
  }

  @patch('/categories/{id}/classifieds', {
    responses: {
      '200': {
        description: 'Category.Classified PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classified, {partial: true}),
        },
      },
    })
    classified: Partial<Classified>,
    @param.query.object('where', getWhereSchemaFor(Classified)) where?: Where<Classified>,
  ): Promise<Count> {
    return this.categoryRepository.classifieds(id).patch(classified, where);
  }

  @del('/categories/{id}/classifieds', {
    responses: {
      '200': {
        description: 'Category.Classified DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Classified)) where?: Where<Classified>,
  ): Promise<Count> {
    return this.categoryRepository.classifieds(id).delete(where);
  }
}
