import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("./home")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Nontonyuk</Text>
        <Text style={styles.subtitle}>Nikmati Film mu dimana saja</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222831', // Ganti sesuai warna splash yang diinginkan
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFBDE',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFBDE',
  },
});
