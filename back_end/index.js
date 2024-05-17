import express from 'express';
import cors from 'cors'
import etudiantRouter from './routers/etudiant.js';
import classeRouter from './routers/classe.js';

const app = express()
app.use(express.json())

const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions))

app.use('/api/etudiant', etudiantRouter)
app.use('/api/classe', classeRouter)

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})