import express from "express";
import { create, getAll, getOne, deleteOne, update } from '../controllers/etudiant.controller.js'

const etudiantRouter = express.Router()

etudiantRouter.get('/', getAll)
etudiantRouter.get('/:id', getOne)
etudiantRouter.delete('/:id', deleteOne)
etudiantRouter.post('/new', create)
etudiantRouter.patch('/:id', update)

export default etudiantRouter;