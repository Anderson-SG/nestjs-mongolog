# nestjs-mongolog

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Anderson-SG_nestjs-mongolog&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Anderson-SG_nestjs-mongolog) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Anderson-SG_nestjs-mongolog&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Anderson-SG_nestjs-mongolog) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Anderson-SG_nestjs-mongolog&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Anderson-SG_nestjs-mongolog) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Anderson-SG_nestjs-mongolog&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Anderson-SG_nestjs-mongolog) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Anderson-SG_nestjs-mongolog&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Anderson-SG_nestjs-mongolog) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Anderson-SG_nestjs-mongolog&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Anderson-SG_nestjs-mongolog) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Anderson-SG_nestjs-mongolog&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Anderson-SG_nestjs-mongolog)

## Description

This package was created with the intention of facilitating and standardizing the writing of nestjs application logs in mongodb databases.

## Instalation

`npm i --save nestjs-mongolog`

## Quick Start

Import **MongodbLogModule** and use **forRoot** or **forRootAsync** static methods on your **Module** for initial configuration:</li>

```typescript
MongodbLogModule.forRootAsync({
  imports: [ConfigModule],

  useFactory: async (configService: ConfigService) => ({
    connectionString: configService.get<string>('DATABASE_URI'),
    databaseName: configService.get<string>('DATABASE_NAME'),
    collectionName: configService.get<string>('LOGS_COLLECTION_NAME'),
  }),

  inject: [ConfigService],
});
```

The fields to be passed in the configuration are as follows:

| Field Name             | Field Function                                                              |
| ---------------------- | --------------------------------------------------------------------------- |
| **connectionString**   | The connection uri for your mongodb database.                               |
| **databaseName**       | The name of the database to which the logs will be written.                 |
| **mongoClientOptions** | Additional settings for mongoClient like: `{ useUnifiedTopology: true }`    |
| **collectionName**     | The name of the collection where this module's logs will be written.        |
| **showInConsole**      | Enables or disables the display of log messages in the application console. |

Import **MongodbLogService** on your service or controller and use the logging methods provided.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(private readonly logger: MongodbLogService) {}

  @Get()
  findAll(): string {
    this.logger.info('listing all cats.', this.findAll.name);
    return 'This action returns all cats';
  }
}
```

Usage:

```typescript
await this.logger.info('MESSAGE');
await this.logger.info({ fo: bar, ov: av });
await this.logger.info({ fo: bar, ov: av }, 'currentFunctionName ou any ContextData');
await this.logger.error('MESSAGE');
await this.logger.warn('MESSAGE');
await this.logger.debug('MESSAGE');
await this.logger.silly('MESSAGE');
await this.logger.fatal('MESSAGE');
```

You don't need to await writing logs if you don't want to.

</ol>
