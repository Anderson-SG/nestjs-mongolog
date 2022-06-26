import { MongoClientOptions } from 'mongodb';

export interface MongodbLogConfig {
  databaseName: string;
  connectionString: string;
  mongoClientOptions?: MongoClientOptions;
  logsCollectionName?: string;
  additionalCollectionNames?: string[];
}
