import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SampleDataSource} from '../datasources';
import {Category, CategoryRelations, Classified} from '../models';
import {ClassifiedRepository} from './classified.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly classifieds: HasManyRepositoryFactory<Classified, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.sample') dataSource: SampleDataSource, @repository.getter('ClassifiedRepository') protected classifiedRepositoryGetter: Getter<ClassifiedRepository>,
  ) {
    super(Category, dataSource);
    this.classifieds = this.createHasManyRepositoryFactoryFor('classifieds', classifiedRepositoryGetter,);
    this.registerInclusionResolver('classifieds', this.classifieds.inclusionResolver);
  }
}
