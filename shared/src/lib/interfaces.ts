import type { Task } from "./task/task";

export type ITask = Partial<Task>

export interface ISubTask extends ITask {
  taskId: number | string;
}

export interface Topic {
  title: string;
  subtitle?: string;
  imageLink?: string;
  link?: string;
}
