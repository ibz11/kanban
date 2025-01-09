import express from 'express'
import {getAllTasks,createTask,updateTask,updateStatus,deleteTask} from '../controllers/task.controller.js'
import { validateTitle,validateStatus,validateDescription } from './validation/validator.js'

const router=express.Router()


router.get('/',getAllTasks)


router.post('/',
[validateTitle,validateDescription,validateStatus]
,createTask)


router.put('/:id',updateTask)
router.patch('/:id',updateStatus)
router.delete('/:id',deleteTask)

export default router;
