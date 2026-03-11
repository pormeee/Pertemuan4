import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export const TodoItem = ({ todo, onToggle, onDelete }) => {
  const { theme } = useTheme();

  const priorityColor = {
    'Tinggi': '#ff5252',
    'Sedang': '#ffb142',
    'Rendah': '#33d9b2'
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <TouchableOpacity onPress={() => onToggle(todo.id)} style={styles.content}>
        <Ionicons 
          name={todo.completed ? 'checkbox' : 'square-outline'} 
          size={24} 
          color={theme.primary} 
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={[
            styles.todoText, 
            { color: theme.text, textDecorationLine: todo.completed ? 'line-through' : 'none' }
          ]}>
            {todo.text}
          </Text>
          
          {/* Tampilan Tanggal & Prioritas */}
          <View style={styles.infoRow}>
            <View style={[styles.priorityTag, { backgroundColor: priorityColor[todo.priority] }]}>
              <Text style={styles.priorityText}>{todo.priority}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={12} color="gray" />
              <Text style={styles.dateText}>{todo.dueDate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Ionicons name="trash-outline" size={24} color="#ff5252" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  content: { flexDirection: 'row', flex: 1, alignItems: 'center' },
  todoText: { fontSize: 16, fontWeight: '500' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  priorityTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, marginRight: 10 },
  priorityText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  dateText: { color: 'gray', fontSize: 11, marginLeft: 4 }
});