import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';

interface Task {
  id: string;
  employeeName: string;
  description: string;
  roomNumber: string;
  assignedTime: string;
  priority: 'Low' | 'Medium' | 'High';
}

export default function PendingTasksScreen() {
  const handleBack = useCallback(() => {
    router.replace('/(admin)/home');
  }, []);

  const [pendingTasks] = useState<Task[]>([
    {
      id: 'TASK001',
      employeeName: 'Mayank Kapoor',
      description: 'Clean the common area',
      roomNumber: 'CA-101',
      assignedTime: '2024-03-02 10:30 AM',
      priority: 'High',
    },
    {
      id: 'TASK002',
      employeeName: 'Rahul Kumar',
      description: 'Fix the water cooler',
      roomNumber: 'B-205',
      assignedTime: '2024-03-02 11:15 AM',
      priority: 'Medium',
    },
  ]);

  const handleMarkComplete = (taskId: string) => {
    Alert.alert(
      'Confirm Completion',
      'Are you sure you want to mark this task as completed?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Here you would typically make an API call to update the task status
            console.log('Marking task as complete:', taskId);
          },
        },
      ]
    );
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'rgba(231, 76, 60, 0.3)';
      case 'Medium':
        return 'rgba(241, 196, 15, 0.3)';
      case 'Low':
        return 'rgba(46, 204, 113, 0.3)';
      default:
        return 'rgba(255, 255, 255, 0.3)';
    }
  };

  const getPriorityBorderColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'rgba(231, 76, 60, 0.5)';
      case 'Medium':
        return 'rgba(241, 196, 15, 0.5)';
      case 'Low':
        return 'rgba(46, 204, 113, 0.5)';
      default:
        return 'rgba(255, 255, 255, 0.5)';
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/alr-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <StatusBar style="light" />
        <Stack.Screen
          options={{
            headerTitle: 'Pending Tasks',
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: true,
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerBackVisible: true,
            gestureEnabled: true,
            headerLeft: () => (
              <TouchableOpacity 
                onPress={handleBack}
                style={{ marginLeft: 16 }}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {pendingTasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <BlurView intensity={30} tint="dark" style={styles.cardContent}>
                  <View style={styles.taskHeader}>
                    <View style={styles.taskInfo}>
                      <ThemedText style={styles.taskId}>{task.id}</ThemedText>
                      <View style={[
                        styles.priorityBadge,
                        { 
                          backgroundColor: getPriorityColor(task.priority),
                          borderColor: getPriorityBorderColor(task.priority),
                        }
                      ]}>
                        <ThemedText style={styles.priorityText}>{task.priority}</ThemedText>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => handleMarkComplete(task.id)}
                    >
                      <ThemedText style={styles.completeButtonText}>Mark Complete</ThemedText>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.taskDetails}>
                    <View style={styles.detailRow}>
                      <Ionicons name="person-outline" size={16} color="#fff" />
                      <ThemedText style={styles.detailText}>{task.employeeName}</ThemedText>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="document-text-outline" size={16} color="#fff" />
                      <ThemedText style={styles.detailText}>{task.description}</ThemedText>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="location-outline" size={16} color="#fff" />
                      <ThemedText style={styles.detailText}>Room {task.roomNumber}</ThemedText>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="time-outline" size={16} color="#fff" />
                      <ThemedText style={styles.detailText}>{task.assignedTime}</ThemedText>
                    </View>
                  </View>
                </BlurView>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
    gap: 16,
  },
  taskCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  completeButton: {
    backgroundColor: 'rgba(46, 204, 113, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.5)',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  taskDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    flex: 1,
  },
}); 