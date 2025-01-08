import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

// Factory function - factory function returns an instance of class or an object
export default (): PostgresConnectionOptions => ({
  url: process.env.URL,
  type: 'postgres',
  port: +process.env.PORT,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: false,
});
