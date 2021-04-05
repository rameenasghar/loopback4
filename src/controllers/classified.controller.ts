import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Classified} from '../models';
import {ClassifiedRepository} from '../repositories';

export class ClassifiedController {
  constructor(
    @repository(ClassifiedRepository)
    public classifiedRepository : ClassifiedRepository,
  ) {}

  @post('/classifieds')
  @response(200, {
    description: 'Classified model instance',
    content: {'application/json': {schema: getModelSchemaRef(Classified)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classified, {
            title: 'NewClassified',
            exclude: ['category_id'],
          }),
        },
      },
    })
    classified: Omit<Classified, 'category_id'>,
  ): Promise<Classified> {
    return this.classifiedRepository.create(classified);
  }

  @get('/classifieds/count')
  @response(200, {
    description: 'Classified model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Classified) where?: Where<Classified>,
  ): Promise<Count> {
    return this.classifiedRepository.count(where);
  }

  @get('/classifieds')
  @response(200, {
    description: 'Array of Classified model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Classified, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Classified) filter?: Filter<Classified>,
  ): Promise<Classified[]> {
    return this.classifiedRepository.find(filter);
  }

  @patch('/classifieds')
  @response(200, {
    description: 'Classified PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classified, {partial: true}),
        },
      },
    })
    classified: Classified,
    @param.where(Classified) where?: Where<Classified>,
  ): Promise<Count> {
    return this.classifiedRepository.updateAll(classified, where);
  }

  @get('/classifieds/{id}')
  @response(200, {
    description: 'Classified model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Classified, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Classified, {exclude: 'where'}) filter?: FilterExcludingWhere<Classified>
  ): Promise<Classified | null> {
    return this.classifiedRepository.findOne(
      {
        where: {
          id: id,
        },
        include: [{relation: 'category'}]
      }
    );
  }

  @patch('/classifieds/{id}')
  @response(204, {
    description: 'Classified PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classified, {partial: true}),
        },
      },
    })
    classified: Classified,
  ): Promise<void> {
    await this.classifiedRepository.updateById(id, classified);
  }

  @put('/classifieds/{id}')
  @response(204, {
    description: 'Classified PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() classified: Classified,
  ): Promise<void> {
    await this.classifiedRepository.replaceById(id, classified);
  }

  @del('/classifieds/{id}')
  @response(204, {
    description: 'Classified DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.classifiedRepository.deleteById(id);
  }
}
