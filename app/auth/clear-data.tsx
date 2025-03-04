import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { router } from 'expo-router';
import { clearAllStudentData } from '../../utils/fileStorage';

export default function ClearDataScreen() {
  const [status, setStatus] = useState('clearing');

  useEffect(() => {
    const clearData = async () => {
      try {
        await clearAllStudentData();
        setStatus('success');
        setTimeout(() => {
          router.replace('/');
        }, 2000);
      } catch (error) {
        console.error('Error clearing data:', error);
        setStatus('error');
        setTimeout(() => {
          router.replace('/');
        }, 2000);
      }
    };

    clearData();
  }, []);

  return (
    <View style={styles.container}>
      {status === 'clearing' && (
        <>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.text}>Clearing all student data...</Text>
        </>
      )}
      {status === 'success' && (
        <>
          <Text style={[styles.text, styles.successText]}>✓</Text>
          <Text style={styles.text}>All student data cleared successfully!</Text>
        </>
      )}
      {status === 'error' && (
        <>
          <Text style={[styles.text, styles.errorText]}>✗</Text>
          <Text style={styles.text}>Error clearing student data</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  successText: {
    fontSize: 48,
    color: '#22C55E',
    marginBottom: -10,
  },
  errorText: {
    fontSize: 48,
    color: '#DC2626',
    marginBottom: -10,
  },
}); 