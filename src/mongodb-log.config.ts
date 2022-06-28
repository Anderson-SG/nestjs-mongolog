import { MongoClientOptions } from 'mongodb';

export interface MongodbLogConfig {
  connectionString: string;
  databaseName: string;
  mongoClientOptions?: MongoClientOptions;
  logsCollectionName?: string;
  additionalCollectionNames?: string[];
  showInConsole?: boolean;
}
