import {Student} from "../model/student.js";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'java59';

let collection;

export async function connect() {
    // if(client.topology && client.topology.isConnected()){
    //     await client.connect();
    // }
    if (!client.topology?.isConnected()) {
        await client.connect();
    }
    const db = client.db(dbName);
    collection = db.collection("college");
}


export const addStudent = async ({id, name, password}) => {
    await connect();
    const existing = await collection.findOne({_id: id});
    if (existing) {
        return false;
    }
    await collection.insertOne({_id: id, name, password, scores: {}});
    return true;
}

export const findStudent = async (id) => {
    await connect()
    return await collection.findOne({_id: id});
}

export const deleteStudent = async (id) => {
    await connect()
    return await collection.findOneAndDelete({_id: id});
}

export const updateStudent = async (id, data) => {
    await connect()
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: data},
        {returnDocument: 'after'}
    );
}

export const addScore = async (id, exam, score) => {
    await connect()
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: {[`scores.${exam}`]: score}},
    );

}

export const findByName = async (name) => {
    await connect()
    return await collection.find({name: {$regex: `${name}$`, $options: 'i'}}).toArray();
}

// export const countByNames = (name) => {
//     const results = {};
//     const arrName = Array.isArray(name) ? name : [name];
//     for (const student of students.values()) {
//         arrName.forEach((item) => {
//             if (student.name === item) {
//                 if (results[item]) {
//                     results[item] += 1;
//                 } else {
//                     results[item] = 1;
//                 }
//             }
//         })
//
//     }
//     return results;
// }
// export const findByMinScore = (exam, minScore) => {
//     return Array.from(students.values()).filter((item) => {
//         return item.scores[exam] >= minScore;
//     });
// };