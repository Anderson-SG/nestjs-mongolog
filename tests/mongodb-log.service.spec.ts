import 'jest';
import { MongoClient } from 'mongodb';
import { MongodbLogService } from '../src/mongodb-log.service';
import { MongoMemoryServer } from 'mongodb-memory-server';

const databaseName = 'testDb';
const collectionName = 'testCollection';

let mongoServer: MongoMemoryServer;
let mongoUri: string;
let mongoClient: MongoClient;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  mongoUri = await mongoServer.getUri();
  mongoClient = await MongoClient.connect(mongoUri);
});

afterAll(async () => {
  await mongoClient.close();
  await mongoServer.stop();
});

test('should log info', async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info('test', 'jest.test');
  expect(result.insertedId).toBeDefined();
});
