/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useState , useEffect} from 'react';
import type { Task, Column as ColumnType } from '../types';
import { Column } from './Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import CreateForm from './Forms/CreateForm';






const COLUMNS: ColumnType[] = [
    { id: 'To-do', title: 'To Do' },
    { id: 'In-progress', title: 'In Progress' },
    { id: 'Done', title: 'Done' },
  ];


  



const DragDrop = () => {


  // const [tasks,setTasks]=useState<Task[]>(INITIAL_TASKS);

 
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


  
    useEffect(() => {
      const fetchTasks = async () => {
        const url = "http://localhost:4000/api/v1/task/"; 
        // const url = "http://localhost:4000/api/v1/task/";
  
        try {
          const response = await fetch(url, {
            method: "GET",
            
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch tasks");
          }
  
          const data = await response.json();
          console.log(data.tasks)
          setTasks(data.tasks); // Assuming the API returns an array of tasks
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTasks();
    }, []);
 
    

    async function updateTaskStatus(taskId: string, newStatus: string) {
      const url = `http://localhost:4000/api/v1/task/${taskId}`; 
      // const url = `http://localhost:4000/api/v1/task/${taskId}`; 
      const payload = { status: newStatus }; // Data to send
    
      try {
        const response = await fetch(url, {
          method: 'PATCH', // Or 'PUT', depending on your API
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update task status');
        }
    
        // console.log('Task status updated successfully');
      } catch (error) {
        console.error('Error updating task status:', error);
        alert('Failed to update task status. Please try again.');
    
        // Optionally revert the task's status in case of an error
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, status: oldStatus } // Revert to the previous status
              : task
          )
        );
      }
    }
    
    
    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      console.log("Dragged Task ID:", active.id);
      console.log("Dropped Column ID:", over?.id);
    
      if (!over) return; // If no drop target, exit
    
      const taskId = active.id as string; // ID of the dragged task
      const newStatus = over.id as Task['status']; // ID of the column where the task is dropped
    
      if (!taskId || !newStatus) return;
    
      // Optimistically update the UI
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, status: newStatus }
            : task
        )
      );
    
      // Send the status update to the server
      updateTaskStatus(taskId, newStatus);
    }
    
    
    
    
    
if (loading) return <p>Loading tasks...</p>;
if (error) return <p>Error: {error}</p>;  
    
    
    
    return (
      <>

  
        <div className="p-4">

<div className="flex justify-center">
<div className=""> 
  <CreateForm/>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => (
             
                <Column
                  key={column.id}
                  column={column}
                
                  tasks={tasks.filter((task) => task.status === column.id)}
                />
              
            ))}
          </DndContext>

         
        </div>
</div>

      </div> 
      </div>
      </>

    );
}

export default DragDrop;
