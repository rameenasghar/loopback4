import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'sample',
  connector: 'postgresql',
  url: 'postgres://postgres:postgres@localhost/olxdb',
  // host: 'localhost',
  // port: 3000,
  // user: 'rameen',
  // password: '123',
  // database: 'testdb'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SampleDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'sample';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.sample', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
