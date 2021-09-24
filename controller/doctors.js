const {findById, findAllDoctors, insertDoctor, updateDoctor, deleteDoctor} = require('../repositories/doctorRepo')



module.exports.index = function (req, res){
    findAllDoctors().then((doctors)=>{
        res.send(doctors)
    })
}

module.exports.create = function(req, res){
    var data = req.body
    data.isSenior = false
    insertDoctor(data).then((status)=>{
        return res.send(status.acknowledged)
    })
}

module.exports.createSenior = function(req, res){
    var data = req.body
    data.isSenior = true
    updateDoctor(null, null, true).then((result)=>{
        insertDoctor(data).then((status)=>{
        return res.send(status.acknowledged)
        })
    })
}

module.exports.details = function(req, res){
    findById(req.params.id).then((doctor)=>{
        if(doctor == null){
            return res.send("Not found")
        }
        return res.send(doctor)
    })
}

module.exports.update = function(req, res){
    var data = req.body
    updateDoctor(req.params.id, data).then((result)=>{
        res.send(result.acknowledged)
    })
}

module.exports.deleteDoctor = function(req, res){
    deleteDoctor(req.params.id).then((result)=>{
        return res.send(result.acknowledged)
    })
}