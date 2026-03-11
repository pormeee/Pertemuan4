import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodoContext = createContext();

// 4 Action Types
const ACTIONS = {
  ADD: 'ADD_TODO',
  DELETE: 'DELETE_TODO',
  TOGGLE: 'TOGGLE_TODO',
  LOAD: 'LOAD_TODOS',
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [action.payload, ...state];
    case ACTIONS.DELETE:
      return state.filter(todo => todo.id !== action.payload);
    case ACTIONS.TOGGLE:
      return state.map(todo => 
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case ACTIONS.LOAD:
      return action.payload;
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // Load data dari AsyncStorage saat app buka
  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem('@todos');
      if (stored) dispatch({ type: ACTIONS.LOAD, payload: JSON.parse(stored) });
    };
    loadData();
  }, []);

  // Simpan data ke AsyncStorage setiap kali ada perubahan
  useEffect(() => {
    AsyncStorage.setItem('@todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch, ACTIONS }}>
      {children}
    </TodoContext.Provider>
  );
};