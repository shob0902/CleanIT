import { Stack } from 'expo-router';
import React from 'react';

export default function StudentLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#fff',
        headerBackVisible: true,
        gestureEnabled: true,
      }}
    />
  );
} 