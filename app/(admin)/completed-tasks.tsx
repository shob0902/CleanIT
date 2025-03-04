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
import DateTimePicker from '@react-native-community/datetimepicker';

interface CompletedTask {
  id: string;
  employeeName: string;
  description: string;
  completionTime: string;
  assignedTime: string;
  roomNumber: string;
}

export default function CompletedTasksScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleBack = useCallback(() => {
    router.replace('/(admin)/home');
  }, []);

  const [completedTasks] = useState<CompletedTask[]>([
    {
      id: 'TASK001',
      employeeName: 'Mayank Kapoor',
      description: 'Clean the common area',
      completionTime: '2024-03-02 11:30 AM',
      assignedTime: '2024-03-02 10:30 AM',
      roomNumber: 'CA-101',
    },
    {
      id: 'TASK002',
      employeeName: 'Rahul Kumar',
      description: 'Fix the water cooler',
      completionTime: '2024-03-02 12:15 PM',
      assignedTime: '2024-03-02 11:15 AM',
      roomNumber: 'B-205',
    },
  ]);

  const filteredTasks = completedTasks.filter(task => {
    const matchesSearch = task.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const taskDate = new Date(task.completionTime);
    const isWithinDateRange = taskDate >= startDate && taskDate <= endDate;
    return matchesSearch && isWithinDateRange;
  });

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
            headerTitle: 'Completed Tasks',
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
            {/* Search and Filter Section */}
            <View style={styles.filterSection}>
              <BlurView intensity={30} tint="dark" style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#fff" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by employee name..."
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </BlurView>

              <View style={styles.dateFilters}>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowStartDate(true)}
                >
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <ThemedText style={styles.dateButtonText}>
                    {startDate.toLocaleDateString()}
                  </ThemedText>
                </TouchableOpacity>

                <ThemedText style={styles.dateSeperator}>to</ThemedText>

                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowEndDate(true)}
                >
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <ThemedText style={styles.dateButtonText}>
                    {endDate.toLocaleDateString()}
                  </ThemedText>
                </TouchableOpacity>
              </View>

              {showStartDate && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowStartDate(false);
                    if (selectedDate) {
                      setStartDate(selectedDate);
                    }
                  }}
                />
              )}

              {showEndDate && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowEndDate(false);
                    if (selectedDate) {
                      setEndDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>

            {/* Tasks List */}
            <View style={styles.tasksList}>
              {filteredTasks.map((task) => (
                <View key={task.id} style={styles.taskCard}>
                  <BlurView intensity={30} tint="dark" style={styles.cardContent}>
                    <View style={styles.taskHeader}>
                      <ThemedText style={styles.taskId}>{task.id}</ThemedText>
                      <ThemedText style={styles.completionTime}>
                        Completed: {task.completionTime}
                      </ThemedText>
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
                        <ThemedText style={styles.detailText}>
                          Assigned: {task.assignedTime}
                        </ThemedText>
                      </View>
                    </View>
                  </BlurView>
                </View>
              ))}
            </View>
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
  filterSection: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#FFFFFF',
  },
  dateFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },
  dateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  dateSeperator: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  tasksList: {
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
  taskId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  completionTime: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
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