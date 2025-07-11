import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or a custom icon component if you have one

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="film-outline" size={80} color="#777" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#282828', // Dark background to match app theme
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: '#B0B0B0',
    textAlign: 'center',
  },
});