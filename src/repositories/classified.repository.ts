import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SampleDataSource} from '../datasources';
import {Classified, ClassifiedRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class ClassifiedRepository extends DefaultCrudRepository<
  Classified,
  typeof Classified.prototype.category_id,
  ClassifiedRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof Classified.prototype.category_id>;

  constructor(
    @inject('datasources.sample') dataSource: SampleDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Classified, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
