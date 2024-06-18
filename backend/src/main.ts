import { MongoClient } from "mongodb"
import http from 'http'


const DATABASE_USERNAME=process.env.MONGO_INITDB_ROOT_USERNAME
const DATABASE_PASSWORD=process.env.MONGO_INITDB_ROOT_PASSWORD
const DATABASE_DB= process.env.MONGO_INITDB_DATABASE
const DATABASE_HOST=process.env.DATABASE_HOST
const DATABASE_PORT=process.env.DATABASE_PORT
const DATABASE_COLLECTION=process.env.DATABASE_COLLECTION

const SERVER_HOST=process.env.SERVER_HOST
const SERVER_PORT=process.env.SERVER_PORT

const URI = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`;
const client = new MongoClient(URI)
const db = client.db(DATABASE_DB)
const collection = db.collection(DATABASE_COLLECTION)

async function main() {
  try{
    await client.connect()
    console.log('connected to mongo')
    const server = http.createServer
    server.on('request', async (req, res)=>{
      const result = await collection.findOne()
      res.end(JSON.stringify(result))
    })
  }
}

main()
  .then(()=> console.log('server started'))
  .catch(err=> console.error('ERROR ',err))

/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
const PORT = process.env.PORT || 5000;


async function start() {
  const app = await NestFactory.create(AppModule, {cors: true})
  app.enableCors();
  app.use('public', express.static(join(__dirname, '..', 'public')));
  await app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
}

start()*/