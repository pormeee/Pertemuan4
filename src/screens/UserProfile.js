import React, { useState, useEffect } from 'react';
const UserProfile = ({ userId }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
 // Pola 1: Tanpa dependency — setiap render
 useEffect(() => {
 console.log('Component re-rendered');
 });
 // Pola 2: Array kosong — hanya saat mount
 useEffect(() => {
 console.log('Component mounted!');
 return () => console.log('Component unmounted!');
 }, []);
 // Pola 3: Dependency — saat userId berubah
 useEffect(() => {
 setLoading(true);
 fetchUser(userId)
 .then(data => setUser(data))
 .finally(() => setLoading(false));

 return () => {
 // Cancel request jika ada
 };
 }, [userId]); // Effect ulang saat userId berubah
 if (loading) return <ActivityIndicator />;
 return <Text>{user?.name}</Text>;
};