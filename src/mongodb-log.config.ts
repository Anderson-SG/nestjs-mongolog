import { MongoClientOptions } from 'mongodb';

export interface MongodbLogConfig {
  connectionString: string;
  databaseName: string;
  mongoClientOptions?: MongoClientOptions;
  collectionName?: string;
  showInConsole?: boolean;
}
