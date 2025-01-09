
import { FaPlus } from "react-icons/fa";
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task } from '../types';
import { useState } from "react";
import CreateModal from "./modal/CreateModal";





type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onTaskCreate: (newTask: Task) => void;

  handleEditClick:()=>void
  setIsEditModalOpen:(isDeleteModalOpen:boolean)=>void
  isEditModalOpen:boolean,
  handleSave:(updatedTask: Task)=>void





  handleDeleteClick:(id:string)=>void
  setIsDeleteModalOpen:(isDeleteModalOpen:boolean)=>void
  isDeleteModalOpen:boolean

};

export function Column({ column, tasks, onTaskCreate ,
  handleEditClick,setIsEditModalOpen,  isEditModalOpen,handleSave,
  handleDeleteClick,setIsDeleteModalOpen,isDeleteModalOpen}: ColumnProps) {

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleAddTaskClick = () => {
    
    setCreateModalOpen(true); // Open the create modal
  };

  const handleCreateTask = (newTask: Task) => {
    onTaskCreate(newTask); // Pass the new task to the parent (DragDrop)
  };



  const { setNodeRef } = useDroppable({
    id: column.id,
  });

   
  

  return (
    <>


    
 
    <div key={column.id} className="flex w-80 flex-col rounded-lg bg-slate-800 p-4">

      <div className="flex  gap-4">
     
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div className="m-1 h-10 flex justify-end">

      <button onClick={handleAddTaskClick} className="bg-white h-8 w-8 rounded-full p-1.5 text-xl shadow-lg border-slate-200 hover:bg-gray-300 hover:-translate-y-1 transition-all  font-bold text-center">
        <FaPlus className="text-lg ml-[0.9px] "/>
        </button>
     
     </div>
      
      </div>

 

      <div  ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard 
                key={task._id}
                handleSave={handleSave}
                handleEditClick={handleEditClick}
                setIsEditModalOpen={setIsEditModalOpen}
                isEditModalOpen={isEditModalOpen}


                handleDeleteClick={handleDeleteClick}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                isDeleteModalOpen={isDeleteModalOpen}

           task={task} />;
        })}
      </div>
    </div>

    <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)} 
        onSave={handleCreateTask} 
        status={column.id} 
      />
    </>
  );
}