import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const FilterBar = ({ currentFilter, onFilterChange }) => {
  const { theme } = useTheme();
  const filters = ['ALL', 'ACTIVE', 'DONE'];

  return (
    <View style={styles.container}>
      {filters.map(f => (
        <TouchableOpacity 
          key={f} 
          onPress={() => onFilterChange(f)}
          style={[
            styles.btn, 
            { backgroundColor: currentFilter === f ? theme.primary : theme.card }
          ]}
        >
          <Text style={{ color: currentFilter === f ? '#fff' : theme.text, fontSize: 12 }}>
            {f}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  btn: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, elevation: 2 }
});