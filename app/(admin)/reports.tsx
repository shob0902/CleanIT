import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';

interface EmployeeReport {
  employeeId: string;
  employeeName: string;
  hostelBlock: string;
  completedTasks: {
    id: string;
    description: string;
    roomNumber: string;
    completionDate: string;
    priority: 'Low' | 'Medium' | 'High';
  }[];
}

export default function ReportsScreen() {
  const [employeeId, setEmployeeId] = useState('');
  const [report, setReport] = useState<EmployeeReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    router.replace('/(admin)/home');
  }, []);

  const handleSearch = () => {
    if (!employeeId.trim()) {
      setError('Please enter an Employee ID');
      setReport(null);
      return;
    }

    // Simulated API call to fetch employee report
    // In a real app, this would be an actual API call
    const mockReport: EmployeeReport = {
      employeeId: 'EMP001',
      employeeName: 'Mayank Kapoor',
      hostelBlock: 'Block A',
      completedTasks: [
        {
          id: 'TASK001',
          description: 'Clean the common area',
          roomNumber: 'CA-101',
          completionDate: '2024-03-02 11:30 AM',
          priority: 'High',
        },
        {
          id: 'TASK003',
          description: 'Replace light bulbs',
          roomNumber: 'A-205',
          completionDate: '2024-03-01 03:45 PM',
          priority: 'Medium',
        },
      ],
    };

    if (employeeId === mockReport.employeeId) {
      setReport(mockReport);
      setError(null);
    } else {
      setError('Employee not found');
      setReport(null);
    }
  };

  const getPriorityColor = (priority: 'Low' | 'Medium' | 'High') => {
    switch (priority) {
      case 'High':
        return 'rgba(231, 76, 60, 0.3)';
      case 'Medium':
        return 'rgba(241, 196, 15, 0.3)';
      case 'Low':
        return 'rgba(46, 204, 113, 0.3)';
    }
  };

  const getPriorityBorderColor = (priority: 'Low' | 'Medium' | 'High') => {
    switch (priority) {
      case 'High':
        return 'rgba(231, 76, 60, 0.5)';
      case 'Medium':
        return 'rgba(241, 196, 15, 0.5)';
      case 'Low':
        return 'rgba(46, 204, 113, 0.5)';
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
            headerTitle: 'View Reports',
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
            {/* Search Section */}
            <View style={styles.searchSection}>
              <BlurView intensity={30} tint="dark" style={styles.searchBar}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Enter Employee ID..."
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={employeeId}
                  onChangeText={setEmployeeId}
                />
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={handleSearch}
                >
                  <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>
              </BlurView>
              {error && (
                <ThemedText style={styles.errorText}>{error}</ThemedText>
              )}
            </View>

            {/* Report Content */}
            {report && (
              <View style={styles.reportContent}>
                {/* Employee Info */}
                <BlurView intensity={30} tint="dark" style={styles.employeeInfo}>
                  <ThemedText style={styles.employeeName}>{report.employeeName}</ThemedText>
                  <ThemedText style={styles.employeeId}>ID: {report.employeeId}</ThemedText>
                  <ThemedText style={styles.employeeBlock}>{report.hostelBlock}</ThemedText>
                </BlurView>

                {/* Tasks List */}
                <View style={styles.tasksList}>
                  <ThemedText style={styles.tasksTitle}>Completed Tasks</ThemedText>
                  {report.completedTasks.map((task) => (
                    <View key={task.id} style={styles.taskCard}>
                      <BlurView intensity={30} tint="dark" style={styles.cardContent}>
                        <View style={styles.taskHeader}>
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

                        <View style={styles.taskDetails}>
                          <View style={styles.detailRow}>
                            <Ionicons name="document-text-outline" size={16} color="#fff" />
                            <ThemedText style={styles.detailText}>{task.description}</ThemedText>
                          </View>
                          <View style={styles.detailRow}>
                            <Ionicons name="location-outline" size={16} color="#fff" />
                            <ThemedText style={styles.detailText}>Room {task.roomNumber}</ThemedText>
                          </View>
                          <View style={styles.detailRow}>
                            <Ionicons name="checkmark-circle-outline" size={16} color="#fff" />
                            <ThemedText style={styles.detailText}>
                              Completed: {task.completionDate}
                            </ThemedText>
                          </View>
                        </View>
                      </BlurView>
                    </View>
                  ))}
                </View>
              </View>
            )}
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
  },
  searchSection: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  searchButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(52, 152, 219, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.5)',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 8,
  },
  reportContent: {
    gap: 24,
  },
  employeeInfo: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  employeeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  employeeId: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  employeeBlock: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  tasksList: {
    gap: 16,
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
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