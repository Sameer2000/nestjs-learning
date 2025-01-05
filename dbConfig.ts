import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  url: 'postgresql://nestjsdb_owner:5liFcAsWRSf4@ep-crimson-dream-a1hdg8a3.ap-southeast-1.aws.neon.tech/nestjsdb?sslmode=require',
  type: 'postgres',
  port: 3306,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
