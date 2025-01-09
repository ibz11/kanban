import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {

    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        enum:['To-do','In-progress','Done'],
        default: 'Todo',
        required: true,
      },



 



  } ,
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  })

//   userRef: {
//     type: String,
//     required: true,
//   },
const Task = mongoose.model('Task', TaskSchema);
export default Task;