export type TaskStatus = 'To-do' | 'In-progress' | 'Done';

export type Task = {
  _id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};