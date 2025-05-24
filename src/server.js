import express from 'express';
import studentRoutes from "./routes/studentRoutes.js";
import dotenv from "dotenv";
import {MongoClient as mongoose, MongoClient} from "mongodb";
import {init} from "./repository/studentRepository.js";
dotenv.config();



const app = express();
const port = process.env.PORT || 9000;
const dbName = 'java59';
const client = new MongoClient(process.env.MONGO_URI);


app.use(express.json());
app.use(studentRoutes);
app.use((req, res) => {
    res.status(404).type('text/plain; charset=utf-8').send('Not Found');
})
async function startServer() {
    try{
        await client.connect();
        const db = await client.db(dbName);
        init(db);
        app.listen(port, () => {
            console.log(`Server started on port ${port}. Press Ctrl-C to finish`);
        })
    }catch (e){
        console.error(`Failed to connect to Mongodb: ${e}`);
    }

}
startServer();
