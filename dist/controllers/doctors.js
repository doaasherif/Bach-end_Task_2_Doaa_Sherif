"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoctor = exports.update = exports.details = exports.createSenior = exports.create = exports.index = void 0;
var doctorsRepo_1 = require("../repositories/doctorsRepo");
var index = function (req, res) {
    (0, doctorsRepo_1.findAllDoctors)().then(function (doctors) {
        res.send(doctors);
    });
};
exports.index = index;
var create = function (req, res) {
    var data = req.body;
    data.isSenior = false;
    (0, doctorsRepo_1.insertDoctor)(data).then(function (status) {
        return res.send(status.acknowledged);
    });
};
exports.create = create;
var createSenior = function (req, res) {
    var data = req.body;
    data.isSenior = true;
    (0, doctorsRepo_1.updateDoctor)(null, null, true).then(function (result) {
        (0, doctorsRepo_1.insertDoctor)(data).then(function (status) {
            return res.send(status.acknowledged);
        });
    });
};
exports.createSenior = createSenior;
var details = function (req, res) {
    (0, doctorsRepo_1.findById)(req.params.id).then(function (doctor) {
        if (doctor == null) {
            return res.send("Not found");
        }
        return res.send(doctor);
    });
};
exports.details = details;
var update = function (req, res) {
    var data = req.body;
    (0, doctorsRepo_1.updateDoctor)(req.params.id, data).then(function (result) {
        res.send(result.acknowledged);
    });
};
exports.update = update;
var deleteDoctor = function (req, res) {
    (0, doctorsRepo_1.deleteDoc)(req.params.id).then(function (result) {
        return res.send(result.acknowledged);
    });
};
exports.deleteDoctor = deleteDoctor;
