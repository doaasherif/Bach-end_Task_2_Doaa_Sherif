import express from 'express';
import bodyParser from 'body-parser';
import {index, create, details, update, createSenior, deleteDoctor} from './controllers/doctors'

const app = express()

app.use(bodyParser.json())

function checkUserAuth(req: Request, res: Response, next: NextFunction){
    if(req.headers['authorization'] != "12345"){
        return res.json({message:"no access"})
    }
    next()
}

// app.post('/auth', login)
app.get('/doctors', checkUserAuth, index)
app.post('/doctors', create)
app.post('/doctors/senior', createSenior)
app.get('/doctors/:id', details)
app.put('/doctors/:id', update)
app.delete('/doctors/:id', deleteDoctor)

app.listen(8000, ()=>{
    console.log('Server running on port 8000')
})