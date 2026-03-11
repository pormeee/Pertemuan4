import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { TodoProvider } from './src/context/TodoContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <HomeScreen />
      </TodoProvider>
    </ThemeProvider>
  );
}