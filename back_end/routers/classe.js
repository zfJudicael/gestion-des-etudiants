import { Router } from "express";
import { getAll, getOne, create, deleteOne, update } from '../controllers/classe.controller.js'

const classeRouter = Router()

classeRouter.get('/', getAll)
classeRouter.get('/:id', getOne)
classeRouter.post('/new', create)
classeRouter.delete('/:id', deleteOne)
classeRouter.patch('/:id', update)

export default classeRouter;