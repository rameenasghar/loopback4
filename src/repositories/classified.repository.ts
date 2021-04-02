import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SampleDataSource} from '../datasources';
import {Classified, ClassifiedRelations} from '../models';

export class ClassifiedRepository extends DefaultCrudRepository<
  Classified,
  typeof Classified.prototype.category_id,
  ClassifiedRelations
> {
  constructor(
    @inject('datasources.sample') dataSource: SampleDataSource,
  ) {
    super(Classified, dataSource);
  }
}
