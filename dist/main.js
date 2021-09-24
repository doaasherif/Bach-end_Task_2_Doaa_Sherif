"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var doctors_1 = require("./controllers/doctors");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
function checkUserAuth(req, res, next) {
    if (req.headers['authorization'] != "12345") {
        return res.json({ message: "no access" });
    }
    next();
}
// app.post('/auth', login)
app.get('/doctors', checkUserAuth, doctors_1.index);
app.post('/doctors', doctors_1.create);
app.post('/doctors/senior', doctors_1.createSenior);
app.get('/doctors/:id', doctors_1.details);
app.put('/doctors/:id', doctors_1.update);
app.delete('/doctors/:id', doctors_1.deleteDoctor);
app.listen(8000, function () {
    console.log('Server running on port 8000');
});
