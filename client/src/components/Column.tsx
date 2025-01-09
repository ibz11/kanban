
import { FaPlus } from "react-icons/fa";
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task } from '../types';




type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

   
  



      
      

      

  return (
    <>


    
 
    <div key={column.id} className="flex w-80 flex-col rounded-lg bg-slate-800 p-4">

      <div className="flex  gap-4">
     
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div className="m-1 h-10 flex justify-end"> 
      <button className="bg-white h-8 w-8 rounded-full p-1.5 text-xl shadow-lg border-slate-200 hover:bg-gray-300 hover:-translate-y-1 transition-all  font-bold text-center">
        <FaPlus className="text-lg ml-[0.9px] "/>
        </button>
     
     </div>
      
      </div>

      <div  ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task._id}
     

           task={task} />;
        })}
      </div>
    </div>
    </>
  );
}