import Task from '../models/Task.js'
import { validationResult } from 'express-validator'




export const getAllTasks=async(require,res,next)=>{
  try {
    const tasks=await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json({tasks:tasks})
  }
  catch(err) {
    console.error(err)
  }
}
export const createTask = async (req, res, next) => {
    try {
    const errors=validationResult(req)
    if (!errors.isEmpty()){
      const errMsg = errors.array().map(err => err.msg);
        return res.status(400).json({errors:errMsg})
    }
      const task = await Task.create(req.body);
      return res.status(200).json(task);
    } catch (error) {
      next(error);
      console.log(error)
    }
  };

  export const updateTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(res.status(404).json({message:"Task not found"}));
    }

  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };


  export const updateStatus = async (req, res, next) => {
    const { id } = req.params; // Extract the document ID from request params
    const { status: newStatus } = req.body; // Extract the new status from request body
    const allowedStatuses = ['To-do', 'In-progress', 'Done'];
  
    try {
      // Validate the new status
      if (!allowedStatuses.includes(newStatus)) {
        return res.status(400).json({ message: 'Invalid status. Allowed values are: To-do, In-progress, Done.' });
      }
  
      // Update the document in the database
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true } // Return the updated document
      );
  
      
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found.' });
      }
  
      // Send the updated document as the response
      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating status:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };

  export const deleteTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id);
  
    if (!task) {
      return next(errorHandler(404, 'Task not found!'));
    }
  

  
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json('Task has been deleted!');
    } catch (error) {
      next(error);
    }
  };