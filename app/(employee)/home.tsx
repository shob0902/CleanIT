import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EmployeeData {
  fullName: string;
  employeeId: string;
  phone: string;
  role: string;
}

interface TaskData {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  timestamp: string;
}

const EMPLOYEE_DATA_KEY = 'employee_data';
const AVAILABILITY_KEY = 'employee_availability';

async function getEmployeeData(): Promise<EmployeeData | null> {
  try {
    const data = await AsyncStorage.getItem(EMPLOYEE_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting employee data:', error);
    return null;
  }
}

async function getAvailabilityStatus(): Promise<boolean> {
  try {
    const status = await AsyncStorage.getItem(AVAILABILITY_KEY);
    return status === 'active';
  } catch (error) {
    console.error('Error getting availability status:', error);
    return false;
  }
}

async function setAvailabilityStatus(isActive: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(AVAILABILITY_KEY, isActive ? 'active' : 'inactive');
  } catch (error) {
    console.error('Error setting availability status:', error);
  }
}

export default function EmployeeHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState<TaskData[]>([
    {
      id: '1',
      title: 'Clean Main Lobby',
      description: 'Sweep and mop the main lobby area',
      status: 'pending',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Sanitize Restrooms',
      description: 'Clean and sanitize all restrooms on first floor',
      status: 'completed',
      timestamp: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    loadEmployeeData();
    loadAvailabilityStatus();
  }, []);

  const loadEmployeeData = async () => {
    const data = await getEmployeeData();
    setEmployeeData(data);
  };

  const loadAvailabilityStatus = async () => {
    const status = await getAvailabilityStatus();
    setIsActive(status);
  };

  const toggleAvailability = async () => {
    const newStatus = !isActive;
    await setAvailabilityStatus(newStatus);
    setIsActive(newStatus);
    // TODO: Send notification to admin about status change
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadEmployeeData();
    loadAvailabilityStatus();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/elr-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <StatusBar style="light" />
        <Stack.Screen
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerBackVisible: false,
            gestureEnabled: false,
            headerLeft: () => null,
            gestureDirection: 'horizontal',
            animation: 'none'
          }}
        />

        <View style={styles.content}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <ThemedText style={styles.welcomeText}>Welcome!!</ThemedText>
            <ThemedText style={styles.nameText}>{employeeData?.fullName || 'Employee'}</ThemedText>
            <ThemedText style={styles.roleText}>{employeeData?.role || 'Cleaning Staff'}</ThemedText>
          </View>

          {/* Tasks Section */}
          <View style={styles.tasksSection}>
            <ThemedText style={styles.sectionTitle}>Today's Tasks</ThemedText>
            
            {/* Pending Tasks */}
            <View style={styles.taskList}>
              <ThemedText style={styles.taskListTitle}>Pending Tasks ({pendingTasks.length})</ThemedText>
              {pendingTasks.map(task => (
                <TouchableOpacity key={task.id} style={styles.taskCard}>
                  <BlurView intensity={30} tint="dark" style={styles.taskContent}>
                    <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
                    <ThemedText style={styles.taskDescription}>{task.description}</ThemedText>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>

            {/* Completed Tasks */}
            <View style={styles.taskList}>
              <ThemedText style={styles.taskListTitle}>Completed Tasks ({completedTasks.length})</ThemedText>
              {completedTasks.map(task => (
                <TouchableOpacity key={task.id} style={styles.taskCard}>
                  <BlurView intensity={30} tint="dark" style={styles.taskContent}>
                    <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
                    <ThemedText style={styles.taskDescription}>{task.description}</ThemedText>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/profile')}
            >
              <BlurView intensity={30} tint="dark" style={styles.actionContent}>
                <Ionicons name="person-circle-outline" size={24} color="#fff" />
                <ThemedText style={styles.actionText}>View Profile</ThemedText>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </BlurView>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
  },
  welcomeSection: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    marginBottom: 32,
    minHeight: 200,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 50,
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 6,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  roleText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
    marginTop: 8,
  },
  availabilityButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tasksSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  taskList: {
    marginBottom: 20,
  },
  taskListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    opacity: 0.9,
  },
  taskCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  taskContent: {
    padding: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 