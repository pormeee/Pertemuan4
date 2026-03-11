import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CounterExample = () => {
 // Deklarasi state: [nilai, setter]
 const [count, setCount] = useState(0);
 const [name, setName] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 // Update dengan nilai langsung
 const increment = () => setCount(count + 1);
 // Update dengan functional update (best practice)
 const decrement = () => setCount(prev => prev - 1);
 // Update object state
 const [user, setUser] = useState({ name: '', age: 0 });
 const updateName = (newName) => {
 setUser(prev => ({ ...prev, name: newName }));
 };
 return (
 <View style={styles.container}>
 <Text style={styles.count}>{count}</Text>
 <View style={styles.row}>
 <Button title='-' onPress={decrement} />
 <Button title='+' onPress={increment} />
 </View>
 <TextInput
 style={styles.input}
 value={name}
 onChangeText={setName}
 placeholder='Masukkan nama'
 />
 </View>
 );
}