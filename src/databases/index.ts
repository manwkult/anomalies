import { join } from 'path';
import { DataSource } from 'typeorm';
// import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';

const sqliteDatasource: DataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, '../../data/anomalies.sqlite'),
  synchronize: true,
  logging: true,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migration/*{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
});

export default sqliteDatasource;
