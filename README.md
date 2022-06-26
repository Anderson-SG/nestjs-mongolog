
# nestjs-mongolog

  

## Description

  

Package for logging things into Mongodb.

  

## Instalation

  

`npm i --save nestjs-mongolog`

  

## Quick Start

  

<ol>

  

<li>Import <b>MongodbLogModule</b> and use <b>forRoot</b> or <b>forRootAsync</b> static methods on your <b>Module</b> for initial configuration:</li>

  

    MongodbLogModule.forRootAsync({
	    imports: [ConfigModule],
	    useFactory: async (configService: ConfigService) => ({
		    connectionString: configService.get<string>('DATABASE_URI'),
		    databaseName: configService.get<string>('DATABASE_NAME'),
	    }),
	    inject: [ConfigService],
    })


The fields to be passed in the configuration are as follows:
<ol>
	<li> <b>connectionString<b> </li> The connection uri for your mongodb database.
	<li> <b>databaseName<b> </li> The name of the database to which the logs will be written.
	<li> <b>mongoClientOptions<b> </li> Additional settings for mongoClient like: <b>{ useUnifiedTopology: true }<b>
	<li> <b>logsCollectionName<b> </li> The name of the collection where this module's logs will be written.
	<li> <b>additionalCollectionNames<b> </li> A list of additional log collections you may need for this module.
</ol>
  
  

<li>Import <b>MongodbLogService</b> on your service or controller and use <b>registerLog</b> method to register log on default log collection,</li> 

    constructor(
	    private  readonly  logger:  MongodbLogService,
    ) {}

Usage:

    await  this.logger.logInfo("MESSAGE");
    await  this.logger.logError("MESSAGE");
    await  this.logger.logWarning("MESSAGE");
    await  this.logger.logDebug("MESSAGE");

<li> Or use <b>registerOn</b> to register log on additional collection defined on MongodbLogModule static method configuration.</li>

	await this.logger.registerOn("COLLECTION_NAME", "Data to Write!")
	await this.logger.registerOn("logs", "An error has occurred XXX")
	await this.logger.registerOn("logs", { fo: "bar" })
  
You don't need to await writing logs if you don't want to.
</ol>