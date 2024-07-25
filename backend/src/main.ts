import { MongoClient } from "mongodb"
import http, { IncomingMessage, ServerResponse } from 'http'


const DATABASE_USERNAME=process.env.ME_CONFIG_MONGODB_AUTH_USERNAME
const DATABASE_PASSWORD=process.env.ME_CONFIG_MONGODB_AUTH_PASSWORD
const DATABASE_DB= process.env.MONGO_INITDB_DATABASE
const DATABASE_HOST=process.env.DATABASE_HOST
const DATABASE_PORT=process.env.DATABASE_PORT
const DATABASE_COLLECTION=process.env.DATABASE_COLLECTION

const SERVER_HOST=process.env.SERVER_HOST
const SERVER_PORT=process.env.SERVER_PORT

//const URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`;
//const URI = process.env.ME_CONFIG_MONGODB_URL;
const URI = 'mongodb+srv://stoltzoa:4sG-RK6-byX-96c@users.x1mtg6d.mongodb.net/?retryWrites=true&w=majority&appName=users';
const client = new MongoClient(URI)
const db = client.db('users')
const collection = db.collection('hotels')

async function main() {
  try{
    await client.connect()
    console.log('connected to mongo')
    const server = http.createServer((req:IncomingMessage, res:ServerResponse)=>{
      collection.findOne().then((result) => {
        res.end(JSON.stringify(result))
      })
    });
    server.on('listening', () => {
      console.log('server is listening');
    });
    server.listen(3000);
    //server.on('request', async (req:IncomingMessage, res:ServerResponse)=>{
     // const result = await collection.findOne()
     // res.end(JSON.stringify(result)) 
    //})
  }
  catch(e){
    console.log(e)
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