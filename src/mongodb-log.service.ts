import { Injectable } from '@nestjs/common';
import { MongoClient, Collection, InsertOneResult } from 'mongodb';
import { Logger } from 'tslog';

@Injectable()
export class MongodbLogService {
  private logColletion: Collection;
  private additionalCollections: { [name: string]: Collection } = {};
  private logger: Logger;

  constructor(
    private readonly client: MongoClient,
    private readonly databaseName: string,
    private readonly logsCollectionName: string,
    private readonly additionalCollectionNames?: string[],
  ) {
    const database = this.client.db(this.databaseName);

    this.logColletion = database.collection(this.logsCollectionName);

    this.additionalCollectionNames?.forEach((name) => {
      this.additionalCollections[name] = database.collection(name);
    });

    this.logger = new Logger();
  }

  async log(level: string, message: string): Promise<InsertOneResult<any>> {
    try {
      switch (level) {
        case 'info':
          this.logger.info(message);
          return await this.logColletion.insertOne({ level, message, date: new Date() });
        case 'warning':
          this.logger.warn(message);
          return await this.logColletion.insertOne({ level, message, date: new Date() });
        case 'error':
          this.logger.error(message);
          return await this.logColletion.insertOne({ level, message, date: new Date() });
        case 'debug':
          this.logger.debug(message);
          return await this.logColletion.insertOne({ level, message, date: new Date() });
        default:
          this.logger.info(message);
          return await this.logColletion.insertOne({ level, message, date: new Date() });
      }
    } catch (error: any) {
      this.logger.error(`Failed to write log to mongodb: ${error?.message}`);
    }
  }

  async logInfo(message: string): Promise<InsertOneResult<any>> {
    return await this.log('info', message);
  }

  async logError(message: string): Promise<InsertOneResult<any>> {
    return await this.log('error', message);
  }

  async logWarning(message: string): Promise<InsertOneResult<any>> {
    return await this.log('warning', message);
  }

  async logDebug(message: string): Promise<InsertOneResult<any>> {
    return await this.log('debug', message);
  }

  async registerLog(log: any): Promise<InsertOneResult<any>> {
    return await this.register(this.logColletion, log);
  }

  async registerOn(collectionName: string, data: any): Promise<InsertOneResult<any> | undefined> {
    try {
      const collection = this.additionalCollections[collectionName];

      if (!collection) {
        this.logger.error(`registerOn :: Additional collection "${collectionName}" need to be set on module config.`);
        return;
      }

      return await this.register(collection, data);
    } catch (error: any) {
      this.logger.error(`registerOn :: Failed to write log to mongodb: ${error?.message}`);
    }
  }

  private async register(colletion: Collection, data: any): Promise<InsertOneResult<any>> {
    try {
      return await colletion.insertOne({ data, date: new Date() });
    } catch (error: any) {
      this.logger.error(`register :: Failed to write log to mongodb: ${error?.message}`);
    }
  }
}
