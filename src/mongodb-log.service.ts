import { Injectable } from '@nestjs/common';
import { MongoClient, Collection, InsertOneResult } from 'mongodb';
import { MongodbLogError } from './mongodb-log.error';

@Injectable()
export class MongodbLogService {
  private logColletion: Collection;
  private additionalCollections: { [name: string]: Collection } = {};

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
  }

  async log(level: string, message: string): Promise<InsertOneResult<any>> {
    try {
      return await this.logColletion.insertOne({ level, message, date: new Date() });
    } catch (error: any) {
      MongodbLogError.print(error?.message);
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
        MongodbLogError.print(`Additional collection "${collectionName}" need to be set on module config.`);
        return;
      }
      return await this.register(collection, data);
    } catch (error: any) {
      MongodbLogError.print(error?.message);
    }
  }

  private async register(colletion: Collection, data: any): Promise<InsertOneResult<any>> {
    try {
      return await colletion.insertOne({ data, date: new Date() });
    } catch (error: any) {
      MongodbLogError.print(error?.message);
    }
  }
}
