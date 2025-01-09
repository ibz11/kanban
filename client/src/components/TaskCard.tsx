import { useDraggable} from '@dnd-kit/core';
import { Task } from '../types';
import { CiEdit, CiTrash } from 'react-icons/ci';

import EditModal from './modal/EditModal';
import DeleteModal from './modal/DeleteModal';


type TaskCardProps = {
  task: Task;

  handleSave:(updatedTask:Task)=>void
  handleEditClick:()=>void
  setIsEditModalOpen:(isEditModalOpen:boolean)=>void
  isEditModalOpen:boolean


  handleDeleteClick:(id:string)=>void
  setIsDeleteModalOpen:(isDeleteModalOpen:boolean)=>void
  isDeleteModalOpen:boolean

};




export const TaskCard:React.FC<TaskCardProps>=({ task ,
  handleEditClick,setIsEditModalOpen,  isEditModalOpen,handleSave,
  handleDeleteClick,setIsDeleteModalOpen,  isDeleteModalOpen})=> {



  



  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;








  return (
    <>
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    > 
    {/* Edit and Delete */}
    <div  className="my-2.5 flex justify-center gap-2">
     <button  onClick={handleEditClick} className="bg-black rounded-full p-0.5 h-6 w-6 text-center shadow-xl mt-0.5 font-bold hover:bg-gray-300 border border-slate-900">
    <CiEdit  className="ml-[1.4px] my-[0.8px] text-green-500"/>
    </button>

    <button   onClick={() => setIsDeleteModalOpen(true)} className="bg-black rounded-full p-0.5 h-6 w-6 text-center shadow-xl mt-0.5 font-bold hover:bg-gray-300 border border-slate-900">
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
{/* Edit task modal */}
    <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleSave} 
        task={task}
      />


          {/* Delete Confirmation Modal */}
        <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)} // Close modal
        id={task._id}
        onConfirm={handleDeleteClick} // Confirm delete action
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />


    </>
  );
}