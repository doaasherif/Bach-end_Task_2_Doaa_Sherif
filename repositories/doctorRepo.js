const {MongoClient, ObjectId} = require('mongodb');
const url = 'mongodb://localhost:27017/';


function getCollection() {
    return new Promise((resolve, reject)=>{
        MongoClient.connect(url, (err, db) =>{
            if (err) reject(err);
            var doctors_db = db.db('DoctorsDB');
            resolve({db: db, collection: doctors_db.collection('Doctors')})
        })
    })
}

module.exports.findById = (id)=>{
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb)=>{
            mydb.collection.findOne({_id : new ObjectId(id)}, (err, result)=>{
                if (err) reject(err);
                resolve(result);
                mydb.db.close();
            })
        })
    })      
}

module.exports.findAllDoctors = ()=>{
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb) =>{
            mydb.collection.find({}).toArray((err, result) =>{
                if(err) reject(err)
                resolve(result)
                mydb.db.close();
            })
        })
    })     
}

module.exports.insertDoctor = (data)=>{
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb)=>{
            mydb.collection.insertOne(data, (err, result)=>{
                if (err) reject(err);
                resolve(result);
                mydb.db.close();
            })
        })
    })
}

module.exports.updateDoctor = (id, data, senior= null)=>{
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb)=>{
            if (senior!= null){
                query = {isSenior: true};
                newValues = {isSenior: false};
            }else{
                query = {_id: ObjectId(id)};
                newValues = data;
            }
            mydb.collection.updateOne(query, {$set: newValues}, (err, result)=>{
                if (err) reject(err);
                resolve(result);
                mydb.db.close();
            })
        })
    })
}

module.exports.deleteDoctor = (id)=>{
    return new Promise((resolve, reject)=>{
        getCollection().then((mydb)=>{
            mydb.collection.deleteOne({_id: ObjectId(id)}, (err, result)=>{
                if (err) reject(err);
                resolve(result)
                mydb.db.close()
            })
        })
    })
}