import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

export const useTodos = () => {
  const { todos, dispatch, ACTIONS } = useContext(TodoContext);
  const [filter, setFilter] = useState('ALL');

  const priorityOrder = { 'Tinggi': 1, 'Sedang': 2, 'Rendah': 3 };

  const filteredTodos = todos
    .filter(t => {
      if (filter === 'ACTIVE') return !t.completed;
      if (filter === 'DONE') return t.completed;
      return true;
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]); // Sorting Priority

  return { filteredTodos, dispatch, ACTIONS, setFilter, filter };
};