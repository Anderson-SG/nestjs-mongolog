import 'jest';
import { MongoClient } from 'mongodb';
import { MongodbLogService } from '../src/mongodb-log.service';
import { MongoMemoryServer } from 'mongodb-memory-server';

const databaseName = 'testDb';
const collectionName = 'testCollection';

let mongoServer: MongoMemoryServer;
let mongoUri: string;
let mongoClient: MongoClient;

function dummyFunction() {
  return 'dummyFunction';
}

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

test('should log warning', async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.warn('test', 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test('should log error', async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.error('test', 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test('should log debug', async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.debug('test', 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test('should log silly', async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.silly('test', 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test('should log fatal', async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.fatal('test', 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test('Should log a object', async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: 'test' }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a 'null' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: null }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a 'undefined' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: undefined }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a 'NaN' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: NaN }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a 'Infinity' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: Infinity }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a '-Infinity' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: -Infinity }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a 'true' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: true }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a 'false' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: false }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a 'string' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: 'test' }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test("Should log a object with a 'number' value", async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ test: 1 }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});

test('Should log a object with functions in it', async () => {
  const mongodbLogService = new MongodbLogService(mongoClient, databaseName, collectionName);
  const result = await mongodbLogService.info({ dataX: 'test', dataY: dummyFunction }, 'jest.test');
  expect(result.insertedId).toBeDefined();
});
