import { MongodbLogConfig } from './mongodb-log.config';
import { MongodbLogService } from './mongodb-log.service';
import { MongodbLogConnections } from './mongodb-log.connections';
import { DEFAULT_LOG_COLLECTION_NAME, MONGODB_LOG_CONFIG } from './constants';
import { Inject } from '@nestjs/common';
import { Logger } from 'tslog';

export class MongodbLogServiceFactory {
  static async create(
    @Inject(MONGODB_LOG_CONFIG) config: MongodbLogConfig,
    connections: MongodbLogConnections,
  ): Promise<MongodbLogService> {
    const logger = new Logger();

    if (!config) {
      logger.error("MongodbLogServiceFactory: 'config' is required");
      return null;
    }
    try {
      const connection = await connections.create(config.connectionString, config.mongoClientOptions);
      return new MongodbLogService(
        connection,
        config.databaseName,
        config.logsCollectionName || DEFAULT_LOG_COLLECTION_NAME,
        config.additionalCollectionNames,
      );
    } catch (error: any) {
      logger.error(`MongodbLogServiceFactory: ${error.message}`);
      throw error;
    }
  }
}
