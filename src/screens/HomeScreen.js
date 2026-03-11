import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTodos } from '../hooks/useTodos';
import { AddTodoForm } from '../components/AddTodoForm';
import { TodoItem } from '../components/TodoItem';
import { FilterBar } from '../components/FilterBar';

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();
  const { filteredTodos, dispatch, ACTIONS, filter, setFilter } = useTodos();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Tasks 📝</Text>
        <View style={styles.row}>
          <Text style={{ color: theme.text, marginRight: 5 }}>🌙</Text>
          <Switch value={theme.dark} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <AddTodoForm onAdd={(todo) => dispatch({ type: ACTIONS.ADD, payload: todo })} />
        
        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        <FlatList
          data={filteredTodos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoItem 
              todo={item} 
              onToggle={(id) => dispatch({ type: ACTIONS.TOGGLE, payload: id })}
              onDelete={(id) => dispatch({ type: ACTIONS.DELETE, payload: id })}
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
              Tidak ada tugas...
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    marginTop: 10 
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center' }
});