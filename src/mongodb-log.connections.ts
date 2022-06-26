import { AnyError, MongoClient, MongoClientOptions } from 'mongodb';
import { OnApplicationShutdown } from '@nestjs/common';

export class MongodbLogConnections implements OnApplicationShutdown {
  private connections: MongoClient[] = [];

  async create(connectionString: string, clientOptions: MongoClientOptions): Promise<MongoClient> {
    return new Promise((resolve, reject) => {
      MongoClient.connect(connectionString, clientOptions, (error: AnyError, client: MongoClient) => {
        if (error) {
          reject(error);
        }
        this.connections.push(client);
        resolve(client);
      });
    });
  }

  onApplicationShutdown(): void {
    this.connections?.forEach((c) => c.close());
  }
}
