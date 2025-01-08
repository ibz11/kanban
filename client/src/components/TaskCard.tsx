import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types';
import { CiEdit, CiTrash } from 'react-icons/ci';


type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {

// async function deleteTask({taskId}:Task){

//     const url = `http://localhost:4000/api/v1/task/${taskId}`; // Replace with your actual API endpoint
   
//   console.log(taskId)
//     try {
//       const response = await fetch(url, {
//         method: 'DELETE', // Or 'PUT', depending on your API
//         headers: {
//           'Content-Type': 'application/json',
//         },
        
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to delete task ');
//       }
  
//       console.log('Task status updated successfully');
//     } catch (error) {
//       console.error('Error updating task status:', error);
//       alert('Failed to delete task status. Please try again.');

//     }
//   }






  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    > 
    {/* Edit and Delete */}
    <div  className="my-2.5 flex justify-end gap-2">
     <div className="bg-black rounded-full p-0.5 h-6 w-6 text-center shadow-xl mt-0.5 font-bold hover:bg-gray-300 border border-slate-900">
    <CiEdit  className="ml-[1.4px] my-[0.8px] text-green-500"/>
    </div>

    <button  className="bg-black rounded-full p-0.5 h-6 w-6 text-center shadow-xl mt-0.5 font-bold hover:bg-gray-300 border border-slate-900">
    <CiTrash  className="ml-[1.4px] my-[0.8px] text-red-500" />
    </button>

    </div>
    {/* End of buttons */}
    
    <div className="flex justify-between gap-1">
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      {
      task.status ==='To-do'?<div className="h-3 w-3 bg-red-500 rounded-full mt-2"></div>:task.status==='In-progress'?<div className="h-3 w-3 bg-orange-500 rounded-full mt-2"></div>:<div className="h-3 w-3 bg-green-500 rounded-full mt-2"></div>
      
    }


    </div>

      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
    </div>
  );
}