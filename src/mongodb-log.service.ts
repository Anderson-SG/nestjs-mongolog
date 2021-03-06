import { Injectable } from '@nestjs/common';
import { MongoClient, Collection, InsertOneResult } from 'mongodb';
import { Logger } from 'tslog';

@Injectable()
export class MongodbLogService {
  private logColletion: Collection;
  private logger: Logger;

  constructor(
    private readonly client: MongoClient,
    private readonly databaseName: string,
    private readonly collectionName: string,
    private readonly showInConsole?: boolean,
  ) {
    const database = this.client.db(this.databaseName);
    this.logColletion = database.collection(this.collectionName);
    this.logger = new Logger();
  }

  private handleLogInput(log: any): any {
    try {
      switch (typeof log) {
        case 'string':
          return { message: log };
        case 'object':
          return JSON.parse(JSON.stringify(log));
        case 'number':
          return { value: log.toString() };
        case 'boolean':
          return { value: log.toString() };
        case 'function':
          return { message: log.toString() };
        case 'symbol':
          return { message: log.toString() };
        case 'undefined':
          return { message: 'undefined' };
        case 'bigint':
          return { value: log.toString() };
      }
    } catch (error: any) {
      this.logger.error(
        `handleLogInput :: Failed to handle log input: ${error?.message} report this to the developer.`,
      );
      return { message: 'Failed to handle log input' };
    }
  }

  private async log(level: string, data: any, logContext: string): Promise<InsertOneResult<any>> {
    try {
      const logObj = {
        level,
        logContext,
        logData: this.handleLogInput(data),
        createdAt: new Date(),
      };

      if (this.showInConsole) this.logger.info(logObj);

      return await this.logColletion.insertOne(logObj);
    } catch (error: any) {
      this.logger.error(`Failed to write log to mongodb: ${error?.message}`);
    }
  }

  async info(data: any, context?: string): Promise<InsertOneResult<any>> {
    return this.log('info', data, context || 'default');
  }

  async silly(data: any, context?: string): Promise<InsertOneResult<any>> {
    return this.log('silly', data, context || 'default');
  }

  async error(data: any, context?: string): Promise<InsertOneResult<any>> {
    return this.log('error', data, context || 'default');
  }

  async warn(data: any, context?: string): Promise<InsertOneResult<any>> {
    return this.log('warning', data, context || 'default');
  }

  async debug(data: any, context?: string): Promise<InsertOneResult<any>> {
    return this.log('debug', data, context || 'default');
  }

  async fatal(data: any, context?: string): Promise<InsertOneResult<any>> {
    return this.log('fatal', data, context || 'default');
  }
}
