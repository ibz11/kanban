

import { useState , useEffect} from 'react';
import type { Task, Column as ColumnType } from '../types';
import { Column } from './Column';
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensors } from '@dnd-kit/core';

// import UpdateForm from './Forms/UpdateForm';
import { PointerSensor,  useSensor } from '@dnd-kit/core';
import axios from 'axios';






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

  
        try {
          const response = await fetch(`${process.env.REACT_API_URL}`, {
            method: "GET",
            
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch tasks");
          }
  
          const data = await response.json();
          // console.log(data.tasks)
          setTasks(data.tasks); // Assuming the API returns an array of tasks
        } catch (error) {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-expect-error 
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTasks();
    }, []);
 
    

    async function updateTaskStatus(taskId: string, newStatus: string) {
 
      const payload = { status: newStatus }; // Data to send
    
      try {
        const response = await fetch(`${process.env.REACT_API_URL}/${taskId}`, {
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
    
   
      } catch (error) {
        console.error('Error updating task status:', error);
        alert('Failed to update task status. Please try again.');
    
    
        // setTasks((prevTasks) =>
        //   prevTasks.map((task) =>
        //     task._id === taskId
        //       ? { ...task, status: oldStatus } 
        //       : task
        //   )
        // );

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, status: task.status } // Going back to task previous status
              : task
          )
        );



      }
    }

    //Create Task
    const handleCreateTask = async (newTask: Task) => {
      try {
        // Make the POST API request to save the task using Axios
        const response = await axios.post(`${process.env.REACT_API_URL}`, newTask);
    
        // Axios doesn't require a separate `.json()` method to parse the response
        const savedTask = response.data;
    
        // Update the state with the newly saved task
        setTasks((prevTasks) => [...prevTasks, savedTask]);
      } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task. Please try again.');
      }
    };


  //Edit Task
  //Edit Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
    //Edit modal 
    const handleEditClick = () => {
      setIsEditModalOpen(true); // Open the edit modal
    };
  
    const handleSave = async (updatedTask: Task) => {
      try {
        const response = await axios.put(`${process.env.REACT_API_URL}/${updatedTask._id}`, updatedTask);
        if (response.status === 200) {
          console.log('Task updated successfully');
        }
        setTasks(tasks.map(task=> (task._id === updatedTask._id ? response.data : task)));
      } catch (error) {
        console.error('Error updating task:', error);
      } finally {
        setIsEditModalOpen(false); // Close modal after updating
      }
    };

    // Delete Task
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // To control modal visibility

    const handleDeleteClick = async (id:string) => {
      try {
        const response = await axios.delete(`${process.env.REACT_API_URL}/${id}`);
        if (response.status === 200) {
          console.log('Task deleted successfully');
        }
        setTasks(tasks.filter(task => task._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setIsDeleteModalOpen(false); // Close modal after deletion
      }
    };
    

    
    //This is fixing the issue with onClick even is not working
    const pointerSensor = useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01
      }
    })
    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)
  
    const sensors = useSensors(
      mouseSensor,
      touchSensor,
      keyboardSensor,
      pointerSensor
    )

    // End if Sensors
    
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


<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => (
             
                <Column
                  key={column.id}
                  column={column}
                  onTaskCreate={handleCreateTask}

                  handleEditClick={handleEditClick}
                  setIsEditModalOpen={setIsEditModalOpen}
                  isEditModalOpen={isEditModalOpen}
                  handleSave={handleSave}

                  isDeleteModalOpen={isDeleteModalOpen}
                  handleDeleteClick={handleDeleteClick}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
              
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
