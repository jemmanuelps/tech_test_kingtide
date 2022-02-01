import dotenv from 'dotenv';
import * as mongoDB from 'mongodb';

export const collections: { users?: mongoDB.Collection } = {}

export async function databaseConnection() {
    dotenv.config();

    const uri_string: string = process.env.DB_CONN_STRING ?? '';
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri_string);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME ?? '');
    collections.users = usersCollection;

    console.log(`Connected to database: ${db.databaseName}`);
}
