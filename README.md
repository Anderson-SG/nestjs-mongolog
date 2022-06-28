
# nestjs-mongolog

  

## Description

  

Package for logging things into Mongodb.

  

## Instalation

  

`npm i --save nestjs-mongolog`

  

## Quick Start

  

<ol>

  

<li>Import <b>MongodbLogModule</b> and use <b>forRoot</b> or <b>forRootAsync</b> static methods on your <b>Module</b> for initial configuration:</li>

  
```
    MongodbLogModule.forRootAsync({
	    imports: [ConfigModule],
	    useFactory: async (configService: ConfigService) => ({
		    connectionString: configService.get<string>('DATABASE_URI'),
		    databaseName: configService.get<string>('DATABASE_NAME'),
			collectionName: configService.get<string>('LOGS_COLLECTION_NAME')
	    }),
	    inject: [ConfigService],
    })
```

The fields to be passed in the configuration are as follows:
<ol>
	<li> <b>connectionString<b> </li> The connection uri for your mongodb database.
	<li> <b>databaseName<b> </li> The name of the database to which the logs will be written.
	<li> <b>mongoClientOptions<b> </li> Additional settings for mongoClient like: <b>{ useUnifiedTopology: true }<b>
	<li> <b>collectionName<b> </li> The name of the collection where this module's logs will be written.
</ol>
  
  

<li>Import <b>MongodbLogService</b> on your service or controller and use <b>registerLog</b> method to register log on default log collection,</li> 

```
    constructor(
	    private  readonly  logger:  MongodbLogService,
    ) {}
```

Usage:

```
    await  this.logger.info("MESSAGE");
	await  this.logger.info({ fo: bar, ov: av });
	await  this.logger.info({ fo: bar, ov: av }, "currentFunctionName ou any ContextData");
    await  this.logger.error("MESSAGE");
    await  this.logger.warn("MESSAGE");
    await  this.logger.debug("MESSAGE");
	await  this.logger.silly("MESSAGE");

```

  
You don't need to await writing logs if you don't want to.
</ol>