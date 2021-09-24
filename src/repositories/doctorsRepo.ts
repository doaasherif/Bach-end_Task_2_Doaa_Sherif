const {MongoClient, ObjectId} = require('mongodb');
const url = 'mongodb://localhost:27017/';


function getCollection(): Promise<{db: typeof MongoClient, collection: Collection}> {
    return new Promise((resolve, reject)=>{
        MongoClient.connect(url, (err: any, db: typeof MongoClient) =>{
            if (err) reject(err);
            var doctors_db = db.db('DoctorsDB');
            resolve({db: db, collection: doctors_db.collection('Doctors')})
        })
    })
}

export const findById = (id: string)=>{
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb)=>{
            mydb.collection.findOne({_id : new ObjectId(id)}, (err: any, result: object)=>{
                if (err) reject(err);
                resolve(result);
                mydb.db.close();
            })
        })
    })      
}

export const findAllDoctors = function(): Promise<Document[] | undefined> {
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb) =>{
            mydb.collection.find({}).toArray((err: any, result: Document[]) =>{
                if(err) reject(err)
                resolve(result)
                mydb.db.close();
            })
        })
    })     
}

export const insertDoctor = function(data: object){
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb)=>{
            mydb.collection.insertOne(data, (err:any, result: object)=>{
                if (err) reject(err);
                resolve(result);
                mydb.db.close();
            })
        })
    })
}

export const updateDoctor = (id: any, data: any, senior: any = null)=>{
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb)=>{
            if (senior!= null){
                const query: object = {isSenior: true};
                const newValues: object = {isSenior: false};
            }else{
                const query: object = {_id: ObjectId(id)};
                const newValues: object = data;
            }
            mydb.collection.updateOne(query, {$set: newValues}, (err: any, result: any)=>{
                if (err) reject(err);
                resolve(result);
                mydb.db.close();
            })
        })
    })
}

export const deleteDoc = (id: string)=>{
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb)=>{
            mydb.collection.deleteOne({_id: ObjectId(id)}, (err: any, result: any)=>{
                if (err) reject(err);
                resolve(result)
                mydb.db.close()
            })
        })
    })
}