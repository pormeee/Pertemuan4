import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Sedang');
  const [dueDate, setDueDate] = useState(''); // State baru untuk tanggal
  const { theme } = useTheme();

  const priorities = ['Tinggi', 'Sedang', 'Rendah'];

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd({ 
      id: Date.now().toString(), 
      text, 
      completed: false, 
      priority,
      dueDate: dueDate || 'Tidak ada deadline' // Simpan tanggal
    });
    setText('');
    setDueDate('');
    setPriority('Sedang');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <TextInput 
        style={[styles.input, { color: theme.text, borderBottomColor: theme.primary }]}
        placeholder="Tambah tugas baru..."
        placeholderTextColor="gray"
        value={text}
        onChangeText={setText}
      />

      <TextInput 
        style={[styles.input, { color: theme.text, borderBottomColor: theme.primary, fontSize: 14 }]}
        placeholder="Tenggat waktu (contoh: 15 Maret)..."
        placeholderTextColor="gray"
        value={dueDate}
        onChangeText={setDueDate}
      />
      
      <View style={styles.priorityContainer}>
        {priorities.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPriority(p)}
            style={[
              styles.priorityBtn,
              { 
                backgroundColor: priority === p ? theme.primary : 'transparent',
                borderColor: theme.primary 
              }
            ]}
          >
            <Text style={{ color: priority === p ? '#fff' : theme.text, fontSize: 12 }}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.btnAdd, { backgroundColor: theme.primary }]} 
        onPress={handleSubmit}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Tambah Tugas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, borderRadius: 15, marginBottom: 15 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8, fontSize: 16 },
  priorityContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  priorityBtn: { flex: 1, marginHorizontal: 4, paddingVertical: 6, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  btnAdd: { padding: 12, borderRadius: 10, alignItems: 'center' }
});