import { Todo } from '@/types/Todo';
import axios from 'axios';

axios.defaults.baseURL = 'https://todo-qc046ljlo-pavlomykhalovs-projects.vercel.app/';

export async function getAll(): Promise<Todo[]> {
  const response = await axios.get('/todos');

  return response.data;
}

export async function updateAll(items: Todo[]): Promise<Todo[]> {
  const response = await axios.patch('/todos?action=update', { items });

  return response.data;
}

export async function deleteAll(items: Todo[]): Promise<Todo[]> {
  const response = await axios.patch('/todos?action=delete', { ids: items.map(item => item.id) });

  return response.data;
}

export async function getOneTodo(todoId: string): Promise<Todo> {
  const response = await axios.get(`/todos/${todoId}`);

  return response.data;
}

export async function remove(todoId: string): Promise<string> {
  const response = await axios.delete(`/todos/${todoId}`);

  return response.statusText;
}

export async function add(title: string, priority: number): Promise<Todo> {
  const response = await axios.post('/todos', { title, priority });

  return response.data;
}

export async function update({ title, completed, id }: Todo): Promise<Todo> {
  const response = await axios.put(`/todos/${id}`, { title, completed });

  return response.data;
}
