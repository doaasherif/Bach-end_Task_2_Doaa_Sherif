"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoc = exports.updateDoctor = exports.insertDoctor = exports.findAllDoctors = exports.findById = void 0;
var _a = require('mongodb'), MongoClient = _a.MongoClient, ObjectId = _a.ObjectId;
var url = 'mongodb://localhost:27017/';
function getCollection() {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err)
                reject(err);
            var doctors_db = db.db('DoctorsDB');
            resolve({ db: db, collection: doctors_db.collection('Doctors') });
        });
    });
}
var findById = function (id) {
    return new Promise(function (resolve, reject) {
        getCollection().then(function (mydb) {
            mydb.collection.findOne({ _id: new ObjectId(id) }, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
                mydb.db.close();
            });
        });
    });
};
exports.findById = findById;
var findAllDoctors = function () {
    return new Promise(function (resolve, reject) {
        getCollection().then(function (mydb) {
            mydb.collection.find({}).toArray(function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
                mydb.db.close();
            });
        });
    });
};
exports.findAllDoctors = findAllDoctors;
var insertDoctor = function (data) {
    return new Promise(function (resolve, reject) {
        getCollection().then(function (mydb) {
            mydb.collection.insertOne(data, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
                mydb.db.close();
            });
        });
    });
};
exports.insertDoctor = insertDoctor;
var updateDoctor = function (id, data, senior) {
    if (senior === void 0) { senior = null; }
    return new Promise(function (resolve, reject) {
        getCollection().then(function (mydb) {
            if (senior != null) {
                var query = { isSenior: true };
                var newValues = { isSenior: false };
            }
            else {
                var query = { _id: ObjectId(id) };
                var newValues = data;
            }
            mydb.collection.updateOne(query, { $set: newValues }, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
                mydb.db.close();
            });
        });
    });
};
exports.updateDoctor = updateDoctor;
var deleteDoc = function (id) {
    return new Promise(function (resolve, reject) {
        getCollection().then(function (mydb) {
            mydb.collection.deleteOne({ _id: ObjectId(id) }, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
                mydb.db.close();
            });
        });
    });
};
exports.deleteDoc = deleteDoc;
