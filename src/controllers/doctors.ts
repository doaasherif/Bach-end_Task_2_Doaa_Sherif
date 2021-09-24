import {findById, findAllDoctors, insertDoctor, updateDoctor, deleteDoc} from '../repositories/doctorsRepo'



export const index = function (req: Request , res: Response){
    findAllDoctors().then((doctors)=>{
        res.send(doctors)
    })
}

export const create = function (req: Request , res: Response){
    var data = req.body
    data.isSenior = false
    insertDoctor(data).then((status)=>{
        return res.send(status.acknowledged)
    })
}

export const createSenior = function (req: Request , res: Response){
    var data = req.body
    data.isSenior = true
    updateDoctor(null, null, true).then((result)=>{
        insertDoctor(data).then((status)=>{
        return res.send(status.acknowledged)
        })
    })
}

export const details = function (req: Request , res: Response){
    findById(req.params.id).then((doctor)=>{
        if(doctor == null){
            return res.send("Not found")
        }
        return res.send(doctor)
    })
}

export const update = function (req: Request , res: Response){
    var data = req.body
    updateDoctor(req.params.id, data).then((result)=>{
        res.send(result.acknowledged)
    })
}

export const deleteDoctor = function (req: Request , res: Response){
    deleteDoc(req.params.id).then((result)=>{
        return res.send(result.acknowledged)
    })
}